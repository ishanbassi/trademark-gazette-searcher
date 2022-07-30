export{solveCaptcha}
import puppeteer from "puppeteer";
import fs, { PathLike } from 'fs'
import path from 'path'
import FormData from 'form-data'
import fetch from 'node-fetch'
let azCaptchaKey = 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
async function solveCaptcha() {

        let result;
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage()
        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        await Promise.all([
            (await page.waitForSelector('#rdb_0')).click() ,
            page.waitForNavigation({waitUntil:"networkidle2"}),
        ])
       
        await page.type('#applNumber', '234234')
        await browser.close()
        await Promise.resolve(result)
       page.on('response', async response => {
            const url = response.url();
            console.log('hi')
            if (response.request().resourceType() === 'image' && url  == 'https://ipindiaonline.gov.in/eregister/captcha.ashx') {
                
                let data = await response.buffer()
                
                // const fileName = `${url.split('/').pop()}.jpg`;
                // const filePath = path.resolve(__dirname, fileName);
                // const writeStream = fs.createWriteStream(filePath);
                // writeStream.write(data);
                await sendCaptcha(data)
                

            }
        });
    
}
async function sendCaptcha(img:Buffer) {
    console.log('hii')
    const formData = new FormData()
    formData.append('key' , azCaptchaKey)
    formData.append('method', 'post')
    formData.append('file', img, {filename:'captcha.jpg'})
    formData.submit('http://azcaptcha.com/in.php', (err, res) => {
            let body = ''
            res.on('data', stream => {
                body += stream
            })
            res.on('end', async () => {
                if(body.includes('OK')) {
                    console.log(body)
                    
                }
                
            })
        })
        
}

async function getResult(captchaId) {
    await new Promise(res => setTimeout(res, 5000))
    let url = `http://azcaptcha.com/res.php?key=${azCaptchaKey}&action=get&id=${captchaId}`
    let response = await fetch(url)
    let body:string = await response.json()
    if(body.includes('OK')) {
        return body.split('|')[1]
    }
    else if (body.includes('CAPTCHA_NOT_READY')) {
        await getResult(captchaId)
    }
}

 (async () => await solveCaptcha())()