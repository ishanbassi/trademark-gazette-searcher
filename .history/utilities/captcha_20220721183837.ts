export{getCaptchaImg}
import puppeteer from "puppeteer";
import fs from 'fs'
import path from 'path'
async function getCaptchaImg() {
    try{
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
                console.log('hi')
                return response.buffer()
            }
        });
        
    }catch(err) {
        console.log(err)
    }
}