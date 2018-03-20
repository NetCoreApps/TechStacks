const http = require('http');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const delay = require('delay');

const ProxyUrl = 'http://localhost:16325';
const elementId = '__nuxt';

const port = 7000;

let CACHE = {};
let PENDING = {};
let id = 0;

const IgnoreExtensions = ['svg','png','jpg','jpeg','gif','ico'];
const TimeoutMs = 10000;

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    const getRenderedHtml = async (url) => {
        let page = null;
        
        try {
            page = await browser.newPage();
            await page.setUserAgent('puppeteer');
            await page.setViewport({ width: 1366, height: 768 });
            await page.goto(url, {waitUntil: 'networkidle2'});

            let html = null;
            const start = new Date();

            do {
                try {
                    html = elementId
                        ? await page.$eval('#' + elementId, e => e.innerHTML)
                        : await page.content();

                    if (html)
                        return html;

                } catch(e) {
                    console.log(e);
                }

                var elapsed = new Date() - start;
                if (elapsed > TimeoutMs) {
                    throw new Error('Timeout trying to access page content')
                }

                await delay(250);
            } while (true);

        } finally {
            if (page) { 
                await page.close();
            }
        }
    }

    const writeHtml = (res,html) => {
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();             
    };

    const requestHandler = async (req,res) => {
        id++;
        let page = null;
        let writtenToResponse = false;
        const reqUrl = req.url.startsWith("/prerender")
            ? req.url.substring("/prerender".length)
            : req.url;

        try {
            const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
            const info = id + ": " + reqUrl + " |ip| " + ip + " |ua| " + req.headers['user-agent'];

            if (IgnoreExtensions.some(x => reqUrl.endsWith(x))) {
                console.log(id + ': ignoring: ' + reqUrl);
                res.writeHeader(401, 'Ignored Extension');
                res.end();
                return;
            }

            const url = ProxyUrl + reqUrl;
            console.log('fetch: ' + info);

            let html = CACHE[reqUrl];
            if (html) {

                writeHtml(res,html);
                writtenToResponse = true;

                if (PENDING[reqUrl]) {
                    console.log(id + ': ' + reqUrl + ' is already pending');
                    return;
                }

                PENDING[reqUrl] = true;

                setTimeout(async () => {
                    try {
                        //update with new cache in background
                        let newHtml = await getRenderedHtml(url);
                        const renderedTooFastWithoutResults = newHtml.length < (html / 2);
                        if (!renderedTooFastWithoutResults) {
                            console.log(id + ': updated cache for ' + reqUrl);
                            CACHE[reqUrl] = newHtml;
                        } else {
                            console.log(id + ': discarding bad result for ' + reqUrl);
                        }
                    } finally {
                        PENDING[reqUrl] = false;
                    }
                }, 10000);

                return;
            } else {

                PENDING[reqUrl] = true;

                try {
                    let newHtml = await getRenderedHtml(url);
                    if (!html) {
                        console.log(id + ': new cache for ' + reqUrl);
                        CACHE[reqUrl] = newHtml;
                        writeHtml(res,newHtml);
                    }
                } finally {
                    PENDING[reqUrl] = false;
                }
            }

        } catch(e) {
            console.log(e.message, e.stack)
            if (!writtenToResponse) {
                res.writeHeader(500, e.message);
                res.end();
            }
        }
    };

    const server = http.createServer(requestHandler)
        
    server.listen(port, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }
    
        console.log(`server is listening on ${port}`)
    });

    process.on('exit', async () => {
        await browser.close();
    });

})();
