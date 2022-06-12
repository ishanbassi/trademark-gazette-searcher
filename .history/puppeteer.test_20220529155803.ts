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
                
                headless:true
            }
            )
        const page = await browser.newPage()
        
        page.on('response', async response => {
            const url = response.url();
            
            if (response.request().resourceType() === 'image' && url  == 'https://ipindiaonline.gov.in/eregister/captcha.ashx') {

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
        await browser.close()
        // await fetch('http://azcaptcha.com/in.php',{
        //     method:'POST',
            
        //     body:JSON.stringify({
        //         key:'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
        //     })
        // },)
        
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng'); 
        
          const { data: { text } } = await worker.recognize(`./captcha.jpg`);
          console.log(text)
          await worker.terminate();
        
        
    }
    catch(err) {
        console.log(err)
        
    }
    
})