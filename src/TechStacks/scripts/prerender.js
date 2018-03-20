const puppeteer = require("puppeteer");

const { JsonServiceClient } = require("@servicestack/client");

const { StorePreRender } = require("./dtos");

var BaseUrl = 'http://localhost:16325';

var client = new JsonServiceClient(BaseUrl);
client.headers.set("Content-Type", "text/html");

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(BaseUrl, {waitUntil: 'networkidle2'});
    const html = await page.$eval('#__nuxt', e => e.innerHTML);

    if (html) {
        try {
            const request = new StorePreRender();
            request.path = "/";
            await client.putBody(request, html);
        } catch(e) {
            console.log(e);
        }
    }

    // other actions...
    await browser.close();
});