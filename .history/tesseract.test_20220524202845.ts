export {}
jest.setTimeout(10000)
 
import { createWorker , PSM} from 'tesseract.js';
 
const worker = createWorker({
  logger: m => console.log(m)
});
 
test( "testing tesseract" , async () => {

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
          
        })
        const { data: { text } } = await worker.recognize('./tesseract_images/captcha3.aspx.jpg');
        console.log(text);
        await worker.terminate();
})