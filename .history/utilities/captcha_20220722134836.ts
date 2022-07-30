export{solveCaptcha}
import puppeteer from "puppeteer";
import fs from 'fs'
import path from 'path'
import FormData from 'form-data'
import fetch from 'node-fetch'
let azCaptchaKey = 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
async function solveCaptcha() {
    
        let result;
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage()
        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        await Promise.all([
            (await page.waitForSelector('#rdb_0')).click() ,
            page.waitForNavigation({waitUntil:"networkidle2"}),
        ])
       
        await page.type('#applNumber', '234234')
        await browser.close()
        
       page.on('response', async response => {
            const url = response.url();
            
            if (response.request().resourceType() === 'image' && url  == 'https://ipindiaonline.gov.in/eregister/captcha.ashx') {
                console.log('hi from solve captcha')
                response.buffer().then( async data => {
                    const fileName = `${url.split('/').pop()}.jpg`;
                    const filePath = path.resolve(__dirname, fileName);
                    const writeStream = fs.createWriteStream(filePath);
                    writeStream.write(data);
                    result = await sendCaptcha(filePath)
                })

            }
        });
    return result
}
async function sendCaptcha(imgPath) {
    let result;
    const formData = new FormData()
    formData.append('key' , azCaptchaKey)
    formData.append('method', 'post')
    formData.append('file', fs.createReadStream(imgPath))
    formData.submit('http://azcaptcha.com/in.php', (err, res) => {
            let body = ''
            res.on('data', stream => {
                body += stream
            })
            res.on('end', async () => {
                if(body.includes('OK')) {
                    console.log('hi from send captcha')
                    result = await getResult(body.split('|')[1])
                }
                
            })
        })
        return result
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