export {}
jest.setTimeout(10000)
 
import { createWorker } from 'tesseract.js';
 
const worker = createWorker({
  logger: m => console.log(m)
});
 
test( "testing tesseract" , async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize('./tesseract_images/captcha.ashx.jpg');
        console.log(text);
        await worker.terminate();
})