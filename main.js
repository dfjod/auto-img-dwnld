const puppeteer = require('puppeteer');
const http = require('http');
const https = require('https');
const fs = require('fs');

let url = 'https://azon.market/faktor-krolika-(id-2291492)';

(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    await page.goto(url);

    const imgSrc = await page.$eval('.thumbnail img', img => img.src);

    const imgName = await page.$eval('.col-sm-4 h1', h1 => h1.textContent);

    await browser.close();
})();