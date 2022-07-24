import puppeteer from "puppeteer";
jest.setTimeout(100000)
jest.useFakeTimers()
import fs from 'fs'
import path from 'path'
import nodeFetch from 'node-fetch'
let decode = require('../utilities/captcha').decode
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
        let captchaImg = fs.readFileSync('./tests/captcha.ashx.jpg')
        let b64Img = Buffer.from(captchaImg).toString('base64')
        
        const formData = new FormData()
        formData.append('key', 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn')
        formData.append('file', fs.createReadStream('./tests/captcha.ashx.jpg'))
        
        await nodeFetch(`http://azcaptcha.com/in.php?method=base64&key=${azCaptchaKey}&file=${b64Img}`,{
            method:'POST',
              
        
            
          
        },)
        .then(res => res.json())
        .then(data => console.log(data))
        
        
        
    }
    catch(err) {
        console.log(err)
        
    }
    
})