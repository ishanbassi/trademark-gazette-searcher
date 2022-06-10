import puppeteer from "puppeteer";
jest.setTimeout(100000)
jest.useFakeTimers()

test('testing puppeteer', async  () => {
    try{
        const browser = await puppeteer.launch(
            {
              headless:false  
                
            }
            )
        const page = await browser.newPage()
        await page.goto('https://ipindiaonline.gov.in/eregister/Application_View.aspx')
        await (await page.waitForSelector('#rdb_0')).click()
        
        
        await     page.type('#applNumber', "2343")
        
        await browser.close()
    }
    catch(err) {
        console.log(err)
        
    }
    
})