import puppeteer from "puppeteer";
jest.setTimeout(100000)

test('testing puppeteer', async  () => {
    try{
        const browser = await puppeteer.launch(
            {headless:false,
                slowMo:1000
             }
            )
        const page = await browser.newPage()
        await page.goto('https://ipindiaonline.gov.in/eregister/eregister.aspx')
        
        await Promise.all(
            [
                page.click('a#btnviewdetails'),
                page.waitForNavigation({waitUntil:'networkidle2'}),
                // page.click('input[id=rdb_0]'),
                // page.waitForNavigation({waitUntil:'networkidle2'}),
            ]
        )
        
        await browser.close()
    }
    catch(err) {
        console.log(err)
    }
    
})