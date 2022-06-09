import puppeteer from "puppeteer";


test('testing puppeteer', async  () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://sunilsandhu.com')
        
        await browser.close()
    
})