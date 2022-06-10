import puppeteer from "puppeteer";
jest.setTimeout(100000)

test('testing puppeteer', async  () => {
    try{
        const browser = await puppeteer.launch(
            
            )
        const page = await browser.newPage()
        await page.goto('https://ipindiaonline.gov.in/eregister/eregister.aspx')
        
        await page.once('load', () =>   console.log('page loaded'))
        
        await browser.close()
    }
    catch(err) {
        console.log(err)
        
    }
    
})