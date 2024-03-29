export{solveCaptcha , sendCaptcha}
import puppeteer, { Page } from "puppeteer";
import fs from 'fs'

import path from "path";
import FormData from 'form-data'
import fetch from 'node-fetch'
import { dataInsert } from "./tmDataUpdate";
import { compressImg } from "./imageCompressor";
let azCaptchaKey = 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
async function solveCaptcha(applNumber:string) {
    try{
        const browser = await puppeteer.launch({
            
            headless: true,
            
            
        });
            const page = await browser.newPage()
            
            try{
                        
                page.on('dialog', async dialog => {
                    if (dialog.message().includes('Please enter image value.')) {
                        await dialog.accept()    
        
                    }
                })
        
    
            await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx', {waitUntil:"domcontentloaded"})
            
            let [captchaResp] = await Promise.all([
                page.waitForResponse('https://ipindiaonline.gov.in/eregister/captcha.ashx', {timeout:10000}),
                (await page.waitForSelector('#rdb_0')).click() ,
                page.waitForNavigation({waitUntil:"networkidle2"}),
            ]) 
            
            
            
            let captchaText = await sendCaptcha(await captchaResp.buffer())
            
            await page.type('#applNumber', applNumber)
            await page.type('#captcha1', captchaText)
            
            await Promise.all([
                page.waitForNavigation({waitUntil:"networkidle2"}),
                page.click('#btnView')
                 
                
            ])     
            let applNoElem = await page.$('#SearchWMDatagrid_ctl03_lnkbtnappNumber1')
            
            if(!applNoElem) {
                await browser.close()
                console.warn('captcha recognition failed , restarting the browser')
                return solveCaptcha(applNumber)
            }
            let [tmImgResp] =  await Promise.all([
                page.waitForResponse(async response => {
                    return response.request().resourceType() === 'image' && response.url().includes('https://ipindiaonline.gov.in/eregister/imagedoc.aspx')
                }),
                applNoElem.click(),
                page.waitForNavigation({waitUntil:"domcontentloaded"})
            ])
            
            // bytea data type supports data string in hex format
            let tmBuffer =  await compressImg(await tmImgResp.buffer())

            let binaryImg  = '\\x' + tmBuffer.toString('hex')
            
            let  [td] = await page.$x("//td[text()='TM Applied For']")
            let trademark = await page.evaluate((el:HTMLElement) => el.nextElementSibling.innerHTML, td)
            await dataInsert(parseInt(applNumber), trademark.toUpperCase(),binaryImg )
            await browser.close()
            console.log(` update done for ${applNumber}`)
            
            }
            catch(err){
                await browser.close()
                console.error(err)
            }
    
    }catch(err)     {
        console.error(err)
    }
  
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

