const puppeteer = require('puppeteer');
const http = require('http');
const https = require('https');
const fs = require('fs/promises');
const readline = require('readline/promises').createInterface({
    input: process.stdin,
    output: process.stdout
});
const { mkdir } = require('fs/promises');
const { /*resolve,*/ join } = require('path');
const xlsx = require('xlsx');


async function makeImageDirectory(path) {
    const createImageDirectory = await mkdir(path);
}

function downloadImage(url, imageName, sequenceNumber, folderPath) {
    const imagePath = join(folderPath, `${sequenceNumber}-${imageName}.jpg`)
    const request = https.get(url, async (result) => {
        try {
            await fs.writeFile(imagePath, result);
            fs.
        } catch (error) {
            console.log('ERROR: ', error);   
        }
    });
    request.on('error', error => console.log('ERROR: ',error));
}

// (async () => {
//     const pathXlsx = await readline.question('Path to xlsx file: ');
//     readline.close();
//     const x = xlsx.readFile(pathXlsx);
//     const sheet = x.Sheets.Sheet1;
//     const links = xlsx.utils.sheet_to_json(sheet, { header: 1 }).map(element => element[0]);
//     console.log('Links: ', links);
// })();

// (async () => {
//     const path = await readline.question('Path: ');
//     console.log(link);
//     readline.close();
// })();

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