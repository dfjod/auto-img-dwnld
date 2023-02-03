const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs/promises');
const readline = require('readline/promises').createInterface({
    input: process.stdin,
    output: process.stdout
});
const { mkdir } = require('fs/promises');
const { join } = require('path');
const xlsx = require('xlsx');

function getLinks(path) {
    const workBook = xlsx.readFile(path);
    const workSheet = workBook.Sheets.Sheet1;
    const links = xlsx.utils.sheet_to_json(workSheet, { header: 1 }).map(element => element[0]);
    return links;
}

function downloadImage(url, imageName, sequenceNumber, folderPath) {
    const imagePath = join(folderPath, `${sequenceNumber}-${imageName}.jpg`)
    const request = https.get(url, async (result) => {
        try {
            await fs.writeFile(imagePath, result);
        } catch (error) {
            console.log('ERROR: ', error);   
        }
    });
    request.on('error', error => console.log('ERROR: ',error));
}

(async () => {
    const pathToUrls = await readline.question('Path to XLSX document containing URLs: ');
    const urls = getLinks(pathToUrls)

    const folderPath = await readline.question('Path for image folder: ');
    readline.close()
    const imageFolder = join(folderPath, 'images');
    await mkdir(imageFolder);


    let sequenceNumber = 1;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for(let url of urls) {
        await page.goto(url);
        const imgSrc = await page.$eval('.thumbnail img', img => img.src);
        const bookName = await page.$eval('.col-sm-4 h1', h1 => h1.textContent);
        const imgName = bookName.split('.')[0].replaceAll('"', '');
        downloadImage(imgSrc, imgName, sequenceNumber, imageFolder);
        sequenceNumber += 1;
    }
    await browser.close();

    console.log('Done!');
})();