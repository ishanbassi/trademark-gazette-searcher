export{solveCaptcha , sendCaptcha}
import puppeteer, { Page } from "puppeteer";
import fs from 'fs'
import path from "path";
import FormData from 'form-data'
import fetch from 'node-fetch'
let azCaptchaKey = 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
async function solveCaptcha() {
        let flag:boolean
        const browser = await puppeteer.launch({headless:false, slowMo:200})
        const page = await browser.newPage()


        
        page.on('dialog', async dialog => {
            if (dialog.message().includes('Please enter image value.')) {
                await dialog.accept()    

            }
        })

        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        await Promise.all([
            (await page.waitForSelector('#rdb_0')).click() ,
            page.waitForNavigation({waitUntil:"networkidle2"}),
        ]) 
        
                  
        const captchaResp = await page.waitForResponse(
            response =>
            response.request().resourceType() === 'image' && response.url()  === 'https://ipindiaonline.gov.in/eregister/captcha.ashx'
          );
        let captchaText = await sendCaptcha(await captchaResp.buffer())
        await page.type('#applNumber', '4376740')
        await page.type('#captcha1', captchaText)
        await page.click('#btnView')
            
        const FailureResp = await page.waitForResponse(
            response =>
            response.request().resourceType() === 'image' && response.url()  === 'https://ipindiaonline.gov.in/eregister/captcha.ashx'
          );
          if(FailureResp.request().resourceType() === 'image' && FailureResp.url()  === 'https://ipindiaonline.gov.in/eregister/captcha.ashx') {
              await browser.close()
              return solveCaptcha()
          }
        await Promise.all([
            page.waitForNavigation({waitUntil:"networkidle2"}),
            (await page.waitForSelector('#SearchWMDatagrid_ctl03_lnkbtnappNumber1')).click() ,
            
        ]) 
        
        const tmImgResp = await page.waitForResponse(async response => {
            return response.request().resourceType() === 'image' && response.url().includes('https://ipindiaonline.gov.in/eregister/imagedoc.aspx')
        })

        let  [td] = await page.$x("//td[text()='TM Applied For']")
        let trademark = await page.evaluate((el:HTMLElement) => el.nextElementSibling.innerHTML, td)
        console.log(trademark)    
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

async function fillCaptcha(page:Page , captchaText:string) {
    await page.type('#applNumber', '4376740')
    await page.type('#captcha1', captchaText)
    await page.click('#btnView')
    await Promise.all([
        (await page.waitForSelector('#SearchWMDatagrid_ctl03_lnkbtnappNumber1')).click() ,
        page.waitForNavigation({waitUntil:"networkidle2"}),
    ]) 
    await Promise.all([
        page.waitForSelector('#panelgetdetail') ,
        page.waitForNavigation({waitUntil:"networkidle2"}),
    ]) 
    
    let  [td] = await page.$x("//td[text()='TM Applied For']")
    
    // let el1 = await page.evaluateHandle((el:HTMLElement) => el.previousElementSibling , td)
    // let el2 = await page.evaluateHandle((el:HTMLElement) => el.parentElement , td)
    // let el3 = await page.evaluateHandle((el:HTMLElement) => el.nextElementSibling , td)
    // let el4 = await page.evaluateHandle((el:HTMLElement) => el.nextSibling , td)
    // let el5 = await page.evaluateHandle((el:HTMLElement) => el.nextElementSibling , td)
    // console.log(await el1.jsonValue(), await el2.jsonValue() , await el3.jsonValue(),await el4.jsonValue(),  await el5.jsonValue())
    let html = await page.evaluate((el:HTMLElement) => el.innerHTML, td)
    console.log(html)
}
