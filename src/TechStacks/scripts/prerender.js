const http = require('http');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const delay = require('delay');

const ProxyUrl = 'http://localhost:16325';
const elementId = '__nuxt';

const port = 7000;

const IgnoreExtensions = ['svg','png','jpg','jpeg','gif','ico'];
const TimeoutMs = 10000;

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    const requestHandler = async (req,res) => {
        let page = null;
        try {

            const info = req.url + " |ip| " + req.connection.remoteAddress + " |ua| " + req.headers['user-agent'];

            if (IgnoreExtensions.some(x => req.url.endsWith(x))) {
                console.log('ignoring: ' + info);
                res.writeHeader(401, 'Ignored Extension');
                res.end();
                return;
            }

            const url = ProxyUrl + req.url;
            console.log('fetch: ' + info);

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
                        break;
                } catch(e) {
                    console.log(e);
                }

                var elapsed = new Date() - start;
                if (elapsed > TimeoutMs) {
                    console.log('timeout: ' + info)
                    res.writeHeader(500, 'Timeout trying to access page content');
                    res.end();
                    return;
                }

                await delay(250);
            } while (true);


            res.writeHeader(200, {"Content-Type": "text/html"});  
            res.write(html);  
            res.end();             
        } catch(e) {
            console.log(e);
        } finally {
            if (page) { 
                await page.close();
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
