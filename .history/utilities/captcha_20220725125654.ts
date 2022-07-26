export{solveCaptcha , sendCaptcha}
import puppeteer, { Page } from "puppeteer";
import fs from 'fs'
import path from "path";
import FormData from 'form-data'
import fetch from 'node-fetch'
let azCaptchaKey = 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
async function solveCaptcha() {

        
        const browser = await puppeteer.launch({headless:false, slowMo:200})
        const page = await browser.newPage()
        
        

        page.on('dialog', async dialog => {
            if (dialog.message().includes('Please enter image value.')) {
                await dialog.accept()
                let captchaValue = await page.$eval('#captcha1', async (elem:HTMLInputElement) => elem.value)
                for(let i=0 ; i < captchaValue.length; i++) {
                    await page.keyboard.press('Backspace')
                }
                let applValue  = await page.$eval('#applNumber', async(elem:HTMLInputElement) => elem.value)
                for(let i=0 ; i < applValue.length; i++) {
                    await page.keyboard.press('Backspace')
                }
                await fillCaptcha(page, captchaText)
                
            }
        })
        // order matters because events have to be attached first 
        // promise should not be awaited since it stops the function execution and following code does not run 
        let captchaText =  new Promise<string>((res,rej) => {
            page.on('response', async response => {
            
                const url = response.url();
                
                if (response.request().resourceType() === 'image' && url  == 'https://ipindiaonline.gov.in/eregister/captcha.ashx') {
                    
                    let data = await response.buffer()
                    res(await sendCaptcha(data))
                    
                        
    
                }
            })
        })
        
        
        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        await Promise.all([
            (await page.waitForSelector('#rdb_0')).click() ,
            page.waitForNavigation({waitUntil:"networkidle2"}),
        ]) 
        
        await page.type('#applNumber', '4376740')
    await page.type('#captcha1',444442)
    await page.click('#btnView')
    await Promise.all([
        (await page.waitForSelector('#SearchWMDatagrid_ctl03_lnkbtnappNumber1')).click() ,
        page.waitForNavigation({waitUntil:"networkidle2"}),
    ]) 
    await Promise.all([
        page.waitForSelector('#panelgetdetail') ,
        page.waitForNavigation({waitUntil:"networkidle2"}),
    ])     
        
            
        await browser.close()
        
        

}
async function sendCaptcha(img:Buffer) {
    
    
    let result = new Promise<string>((resolve,reject) => {
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
                    resolve(await getResult(body.split('|')[1]))
                    
                }else if(body.includes('ERROR_NO_SLOT_AVAILABLE')) {
                    await new Promise(res => res(setTimeout('', 3000)))
                    resolve(await sendCaptcha(img))
                }
                else if (body.includes('ERROR_ZERO_BALANCE')) {
                    reject('Not enough funds')
                }
                else {
                    reject(body)
                }
                
            })
    })
    })
    
    return result
    
        
}

async function getResult(captchaId:string) {
    // api requires a timeout of 5s before making get request
    
    await new Promise(res => setTimeout(res, 5000))
    let url = `http://azcaptcha.com/res.php?action=get&key=${azCaptchaKey}&id=${captchaId}`
    let response = await fetch(url, {method:'get'})
    
    let result = await response.text()
    if(result.includes('OK')) {
        
        return result.split('|')[1]
    }
    else if (result.includes('CAPCHA_NOT_READY')) {
        return await getResult(captchaId)
    }
    
}

async function fillCaptcha(page:Page , captchaText:Promise<string>) {
    await page.type('#applNumber', '4376740')
    await page.type('#captcha1', await captchaText)
    await page.click('#btnView')
    await Promise.all([
        (await page.waitForSelector('#SearchWMDatagrid_ctl03_lnkbtnappNumber1')).click() ,
        page.waitForNavigation({waitUntil:"networkidle2"}),
    ]) 
    await Promise.all([
        page.waitForSelector('#panelgetdetail') ,
        page.waitForNavigation({waitUntil:"networkidle2"}),
    ]) 
    
    let  [td] = await page.$x("//td[contains(.,'TM Applied For')]")

    let prev = await page.evaluateHandle(el => el.previousElementSibling , td)
    console.log(await prev.getProperty('innerHTML'))
    
}
