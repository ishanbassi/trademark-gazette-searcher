import puppeteer from "puppeteer";
jest.setTimeout(100000)
jest.useFakeTimers()
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { createWorker , PSM} from 'tesseract.js';
 import Jimp from 'jimp';
const worker = createWorker({
  logger: m => m
});
test('testing puppeteer', async  () => {
    try{
        const browser = await puppeteer.launch(
            {
                
                headless:false
            }
            )
        const page = await browser.newPage()
        
        page.on('response', async response => {
            const url = response.url();
            console.log(url)
            if (response.request().resourceType() === 'image' && response.request().url() == 'https://ipindiaonline.gov.in/eregister/captcha.ashx') {

                response.buffer().then(file => {
                    const fileName = `${url.split('/').pop()}.jpg`;
                    const filePath = path.resolve(__dirname, fileName);
                    const writeStream = fs.createWriteStream(filePath);
                    writeStream.write(file);
                });
            }
        });
        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        await Promise.all([
            (await page.waitForSelector('#rdb_0')).click() ,
            page.waitForNavigation({waitUntil:"networkidle2"}),
        ])
       
        await page.type('#applNumber', '234234')
        // await fetch('http://azcaptcha.com/in.php',{
        //     method:'POST',
            
        //     body:JSON.stringify({
        //         key:'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
        //     })
        // },)
        await Jimp.read('./tesseract_images/83.bmp')
            .then(lenna => {
              return lenna
                .scale(1.2,Jimp.RESIZE_BICUBIC)
                
                .quality(100) // set JPEG quality
                .greyscale() // set greyscale
                .contrast(1)
                
                .write('./tesseract_images/15-jimp.jpg'); // save
            })
            .catch(err => {
              console.error(err);
            });
            await worker.load();
          await worker.loadLanguage('eng');
          await worker.initialize('eng'); 
          
          const { data: { text } } = await worker.recognize(`./tesseract_images/122.bmp`);
          console.log(text)
          await worker.terminate();
  
        await browser.close()
    }
    catch(err) {
        console.log(err)
        
    }
    
})