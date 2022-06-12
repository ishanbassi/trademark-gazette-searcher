import puppeteer from "puppeteer";
jest.setTimeout(100000)
jest.useFakeTimers()
import fs from 'fs'
import path from 'path'
test('testing puppeteer', async  () => {
    try{
        const browser = await puppeteer.launch(
            {
                
                headless:true
            }
            )
        const page = await browser.newPage()
        
        page.on('response', async response => {
            const url = response.url();
            if (response.request().resourceType() === 'image') {
                response.buffer().then(file => {
                    const fileName = url.split('/').pop();
                    const filePath = path.resolve(__dirname, fileName);
                    const writeStream = fs.createWriteStream(filePath);
                    writeStream.write(file);
                });
            }
        });
        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        await Promise.all([
            (await page.waitForSelector('#rdb_0')).click() ,
            page.waitForNavigation({waitUntil:"networkidle2"}),
        ])
        await page.screenshot({
            path:"./screenshot.png",
            
        })
        await page.type('#applNumber', '234234')
        
        await browser.close()
    }
    catch(err) {
        console.log(err)
        
    }
    
})