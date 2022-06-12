import puppeteer from "puppeteer";
jest.setTimeout(100000)
jest.useFakeTimers()

test('testing puppeteer', async  () => {
    try{
        const browser = await puppeteer.launch(
            {
                
                headless:true
            }
            )
        const page = await browser.newPage()
        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        
        
        await Promise.all([
            (await page.waitForSelector('#rdb_0')).click() ,
            page.waitForNavigation({waitUntil:"networkidle2"}),
        ])
        await page.screenshot({
            path:"./screenshot.png",
            fullPage:true
        })
        await page.type('#applNumber', '234234')
        
        await browser.close()
    }
    catch(err) {
        console.log(err)
        
    }
    
})