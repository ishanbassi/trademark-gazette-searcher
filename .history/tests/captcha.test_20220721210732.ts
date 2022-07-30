export{}
jest.setTimeout(50000)
import { createWriteStream } from 'fs'
import {getCaptchaImg} from '../utilities/captcha'

import puppeteer from "puppeteer";
import fs from 'fs'
import path from 'path'
import FormData from 'form-data'
let azCaptchaKey = 'qrj6czmpvydyj9kbwmbxghpfzv2c8krn'
test('captcha function', async () => {
    try{
        
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage()
        
        
        page.on('response', async response => {
            const url = response.url();
            
            if (response.request().resourceType() === 'image' && url  == 'https://ipindiaonline.gov.in/eregister/captcha.ashx') {
                console.log('hii')
                response.buffer().then(data => {
                    console.log(data)
                    const formData = new FormData()
                    formData.append('key' , azCaptchaKey)
                    formData.append('method', 'post')
                    formData.append('file', data)
                    formData.submit(`http://azcaptcha.com/in.php`, (err,res) => {
                        let body = ""
                        res.on("data", (chunk) => {
                            body += chunk
                        })
                        res.on('end', () => {
                            console.log(body)
                            
                        })
                    })
                })

            }
        });
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
})