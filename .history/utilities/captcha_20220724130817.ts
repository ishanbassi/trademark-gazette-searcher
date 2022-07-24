export{solveCaptcha , sendCaptcha}
import puppeteer from "puppeteer";
import fs from 'fs'
import path from "path";
import FormData from 'form-data'
import fetch from 'node-fetch'
let azCaptchaKey = 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
async function solveCaptcha() {

        let captchaText
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage()
         
        page.on('response', async response => {
            
            const url = response.url();
            
            if (response.request().resourceType() === 'image' && url  == 'https://ipindiaonline.gov.in/eregister/captcha.ashx') {
                
                let data = await response.buffer()
                
                // const fileName = `${url.split('/').pop()}.jpg`;
                // const filePath = path.resolve(__dirname, fileName);
                // const writeStream = fs.createWriteStream(filePath);
                // writeStream.write(data);
                captchaText = await sendCaptcha(data)
                
                    

            }
        })
        
        
    
        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        await Promise.all([
            (await page.waitForSelector('#rdb_0')).click() ,
            page.waitForNavigation({waitUntil:"networkidle2"}),
        ])
        
        await page.type('#applNumber', '4376740')
        await page.type('#captcha1', captchaText)
        
        await browser.close()

}
async function sendCaptcha(img:Buffer) {
    
    let result = ''
    
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
                result =  await getResult(body.split('|')[1])
                console.log(result)
            }
            
        })
    })
    return result
    
        
}

async function getResult(captchaId) {
    await new Promise(res => setTimeout(res, 5000))
    let url = `http://azcaptcha.com/res.php?action=get&key=${azCaptchaKey}&id=${captchaId}`
    let response = await fetch(url, {method:'get'})
    
    let result = await response.text()
    if(result.includes('OK')) {
        
        return result.split('|')[1]
    }
    else if (result.includes('CAPCHA_NOT_READY')) {
        await getResult(captchaId)
    }
}


