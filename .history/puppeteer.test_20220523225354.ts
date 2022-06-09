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
        await page.goto('https://trademark-gazette-searcher.vercel.app/')
        
        await page.click('button')
        
        await browser.close()
    }
    catch(err) {
        console.log(err)
    }
    
})