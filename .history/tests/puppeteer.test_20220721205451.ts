import puppeteer from "puppeteer";
jest.setTimeout(100000)
jest.useFakeTimers()
import fs from 'fs'
import path from 'path'
import nodeFetch from 'node-fetch'

import { createWorker , PSM} from 'tesseract.js';
import FormData from "form-data";
 let azCaptchaKey = 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
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
                console.log('hii')
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
        const formData = new FormData()
        formData.append('key' , azCaptchaKey)
        formData.append('method', 'post')
        formData.append('file', fs.createReadStream('./tests/captcha.ashx.jpg'))
        
        
        
        
    }
    catch(err) {
        console.log(err)
        
    }
    
})