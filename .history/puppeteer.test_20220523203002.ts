import puppeteer from "puppeteer";


test('testing puppeteer', async  () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://google.com')
        
        await browser.close()
    
})