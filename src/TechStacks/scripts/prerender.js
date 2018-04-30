const http = require('http');
//const url = require('url');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const delay = require('delay');

const port = 9000;

const AllowOrigins = ["localhost:16325","localhost:3000","techstacks.io","www.techstacks.io"];
const ProxyUrl = 'https://www.techstacks.io';
// const ProxyUrl = 'http://localhost:16325';
const elementSelector = '#app';

const EnableCors = false;
const ExpiredCacheIntervalMs = 30000;
const RefreshEntriesAfterMs = 10 * 60 * 1000;
const RemoveEntriesWithViewsLowerThan = 2;
const IgnoreExtensions = ['.svg','.png','.jpg','.jpeg','.gif','.ico','.js','.css'];
const ResourceWhiteList = ['document', 'script', 'xhr', 'fetch']; // 2. Ignore resources that don't produce DOM
const ValidPageSelector = '.no-prerender';
const TimeoutMs = 10000;
const log = true;
const logErrors = true;

var lastFlushed = new Date(); 
const lastFlushedTimeoutMs = 24 * 60 * 60 * 1000;

let CACHE = {};
let PENDING = {};
let id = 0;

(async () => {
    const pagePool = new ObjectPool(10, createPage);

    var browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    async function createPage () {
        if (new Date() - lastFlushed > lastFlushedTimeoutMs) {
            try {
                await browser.close();
                browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-dev-shm-usage'] });
                pagePool.flush();
                lastFlushed = new Date();
            } catch(e){}
        }

        page = await browser.newPage();
        await page.setRequestInterception(true);

        page.on('request', req => {
          if (!ResourceWhiteList.includes(req.resourceType())) {
            return req.abort();
          }
          req.continue();
        });
      
        await page.setUserAgent('puppeteer');
        await page.setViewport({ width: 1366, height: 768 });
        return page;
    }

    async function refreshExpiredCaches()
    {
        let expiredUrls = [];
        let now = new Date();
        for (let url in CACHE) {
            let { html, at, views } = CACHE[url];
            if ((now - at) > RefreshEntriesAfterMs) {
                if (views <= RemoveEntriesWithViewsLowerThan) {
                    if (log) console.log("deleting " + url + " with " + views + " view(s)");
                    delete CACHE[url];
                    continue;
                }
                expiredUrls.push(url);
            }
        }

        let oldestExpiredUrls = expiredUrls.sort((a,b) => CACHE[a].at - CACHE[b].at);
        if (log) console.log("refreshing " + oldestExpiredUrls.length + " expired url(s)");

        try {
            if (expiredUrls.length > 0) {
                for (let i=0; i<oldestExpiredUrls.length; i++) {
                    let reqUrl = oldestExpiredUrls[i];
        
                    try {
                        if (PENDING[reqUrl]) {
                            console.log(id + ': ' + reqUrl + ' is already pending');
                            continue;
                        }
        
                        let at = new Date();
                        const absoluteUrl = ProxyUrl + reqUrl;
                        let html = await getRenderedHtml(absoluteUrl);
                        if (log) console.log("refreshed expired url: " + reqUrl + " |age| " + (now - CACHE[reqUrl].at) + "ms |size| " + html.length);
                        CACHE[reqUrl] = { html, at, views:1 };
                    } catch(e) {
                        if (logErrors) console.log('ERROR page: ' + reqUrl, e.message, e.stack);
                    }
                }
            }
        } catch(e) {
            if (logErrors) console.log('ERROR refreshExpiredCaches', e.message, e.stack);
        }

        setTimeout(refreshExpiredCaches, ExpiredCacheIntervalMs);
    }

    refreshExpiredCaches();

    const getPageRenderedHtml = async(page, absoluteUrl) => {
        await page.goto(absoluteUrl, {waitUntil: 'networkidle2'});

        let html = null;
        const start = new Date();

        do {
            try {
                await page.waitForSelector(ValidPageSelector);

                html = elementSelector
                    ? await page.$eval(elementSelector, e => e.innerHTML)
                    : await page.content();

                if (html)
                    return html;

            } catch(e) {
                if (logErrors) console.log(e);
            }

            var elapsed = new Date() - start;
            if (elapsed > TimeoutMs) {
                throw new Error('Timeout trying to access page content')
            }

            await delay(250);
        } while (true);
    };

    const getRenderedHtml = async (absoluteUrl) => {
        let page = await pagePool.obtain();
        // console.log('using page ' + page.__id);
        const ret = await getPageRenderedHtml(page, absoluteUrl);
        pagePool.recycle(page); //only recycle if there were no errors
        return ret;
    };

    const setCorsHeaders = (req,res) => {
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        const origin = req.headers['origin'];
        if (origin && AllowOrigins.indexOf(origin) >= 0) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }

    const writeHtml = (res,html) => {
        res.writeHeader(200, { 
            "Content-Type": "text/html"
        });  
        res.write(html);  
        res.end();             
    };

    const requestHandler = async (req,res) => {
        if (EnableCors) setCorsHeaders(req,res);

        const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        if (req.method == "OPTIONS") {
            console.log("OPTIONS: " + req.url + " |ip| " + ip + " |ua| " + req.headers['user-agent'])
            res.end();
            return;
        }

        id++;
        let page = null;
        let writtenToResponse = false;
        const reqUrl = req.url.startsWith("/prerender")
            ? req.url.substring("/prerender".length)
            : req.url;

        try {
            const info = id + ": " + reqUrl + " |ip| " + ip + " |ua| " + req.headers['user-agent'];

            if (IgnoreExtensions.some(x => reqUrl.endsWith(x))) {
                console.log(id + ': ignoring: ' + reqUrl);
                res.writeHeader(401, 'Ignored Extension');
                res.end();
                return;
            }

            if (log) console.log('fetch: ' + info);

            let entry = CACHE[reqUrl];
            if (entry != null) {
                entry.views++;
                writeHtml(res, entry.html);
            } else {

                PENDING[reqUrl] = true;

                try {
                    let now = new Date();
                    const absoluteUrl = ProxyUrl + reqUrl;
                    let newHtml = await getRenderedHtml(absoluteUrl);
                    if (log) console.log(id + ': new cache for ' + reqUrl);
                    CACHE[reqUrl] = { html: newHtml, at: now, views:1 };
                    writeHtml(res,newHtml);
                } finally {
                        PENDING[reqUrl] = false;
                    }
                }

        } catch(e) {
            if (logErrors) console.log(e.message, e.stack)
            res.writeHeader(500, e.message);
            res.end();
        }
    };

    const server = http.createServer(requestHandler)
        
    server.listen(port, (err) => {
        if (err) {
            return console.log('ERROR server.listen', err)
        }
    
        console.log(`server is listening on ${port}`)
    });

    process.on('exit', async () => {
        await browser.close();
    });

})();

function ObjectPool(iLimit, fnConstructor) {
    this._aObjects = new Array(iLimit);
    this._fnConstructor = fnConstructor;
    this._iLimit = iLimit;
    this._iSize = 0;
    this._idCounter = 0;
 
    this.obtain = async function() {
        if (this._iSize > 0) {
            this._iSize--;
            var oTemp = this._aObjects[this._iSize];
            this._aObjects[this._iSize] = null;
            return oTemp;
        }
 
        const o = await fnConstructor();
        o.__id = ++this._idCounter;
        return o;
    };
 
    this.recycle = function(oRecyclable) {
        if (!oRecyclable instanceof this._fnConstructor) {
            throw new Error("Trying to recycle the wrong object for pool.");
        }
 
        if (this._iSize < this._iLimit) {
            this._aObjects[this._iSize] = oRecyclable;
            this._iSize++;
        } else {
            // The pool is full, object will be deferred to GC for cleanup.
            if (oRecyclable.close) {
                oRecyclable.close();
            }
        }
    };
 
    this.getSize = function() {
        return this._iSize;
    };

    this.flush = function() {
        for (var i=0; i<this._iSize; i++) {
            var oTemp = this._aObjects[i];
            try {
                if (oTemp != null && oTemp.close) {
                    oTemp.close();
                }
            } catch(e){}
        }

        this._iSize = 0;
    };
}