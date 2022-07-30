export{solveCaptcha}
import puppeteer from "puppeteer";

import FormData from 'form-data'
import fetch from 'node-fetch'
let azCaptchaKey = 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
async function solveCaptcha() {

        
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage()
        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        await Promise.all([
            (await page.waitForSelector('#rdb_0')).click() ,
            page.waitForNavigation({waitUntil:"networkidle2"}),
        ])
       
        await page.type('#applNumber', '234234')
        
        console.log('hiiiiii')
         await new Promise((res, rej) => {
            page.on('response', async response => {
                
                const url = response.url();
                console.log(url)
                if (response.request().resourceType() === 'image' && url  == 'https://ipindiaonline.gov.in/eregister/captcha.ashx') {
                    
                    let data = await response.buffer()
                    
                    // const fileName = `${url.split('/').pop()}.jpg`;
                    // const filePath = path.resolve(__dirname, fileName);
                    // const writeStream = fs.createWriteStream(filePath);
                    // writeStream.write(data);
                    res(sendCaptcha(data))
                    
    
                }else{
                   rej(url)
                }
            })
        })
        
        
        await browser.close()

}
async function sendCaptcha(img:Buffer) {
    
    const formData = new FormData()
    formData.append('key' , azCaptchaKey)
    formData.append('method', 'post')
    formData.append('file', img, {filename:'captcha.jpg'})
     await new Promise((resolve , reject) => {
        formData.submit('http://azcaptcha.com/in.php', (err, res) => {
            let body = ''
            res.on('data', stream => {
                body += stream
            })
            res.on('end', async () => {
                console.log('hee')
                if(body.includes('OK')) {
                    resolve(getResult(body.split('|')[1]))
                    
                }
                
            })
        })
    })
    
        
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


