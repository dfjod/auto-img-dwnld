const puppeteer = require('puppeteer');
const http = require('http');
const https = require('https');
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const { mkdir } = require('fs/promises');
const { resolve, join } = require('path');

async function makeImageDirectory(path) {
    const createImageDirectory = await mkdir(path);
}


readline.question('Links: ', link => {
    console.log(link);
    readline.close();
});


// readline.question('Path: ', answerPath => {
//     const imageDirectory = join(answerPath, 'images');
//     makeImageDirectory(imageDirectory).catch(console.error);  
//     readline.close();
// });

// let url = '';

// (async () => {
//     const browser = await puppeteer.launch({headless:false});
//     const page = await browser.newPage();

//     await page.goto(url);

//     const imgSrc = await page.$eval('.thumbnail img', img => img.src);

//     const imgName = await page.$eval('.col-sm-4 h1', h1 => h1.textContent);

//     await browser.close();
// })();