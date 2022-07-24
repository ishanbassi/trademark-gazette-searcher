export{getCaptchaImg}
import puppeteer from "puppeteer";
import fs from 'fs'
import path from 'path'
import FormData from 'form-data'
let azCaptchaKey = 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
async function getCaptchaImg() {
    try{
        
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage()
        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        await Promise.all([
            (await page.waitForSelector('#rdb_0')).click() ,
            page.waitForNavigation({waitUntil:"networkidle2"}),
        ])
       
        await page.type('#applNumber', '234234')
        await browser.close()
        
        
    }catch(err) {
        console.log(err)
    }
}