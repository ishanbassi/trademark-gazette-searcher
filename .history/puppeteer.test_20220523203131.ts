import puppeteer from "puppeteer";


test('testing puppeteer', async  () => {
    try{
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://trademark-gazette-searcher.vercel.app/')
        
        await browser.close()
    }
    catch(err) {
        console.log(err)
    }
    
})