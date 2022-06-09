export {}
jest.setTimeout(100000)
import { promises } from 'fs'; 
import { createWorker , PSM} from 'tesseract.js';
 
const worker = createWorker({
  logger: m => m
});
 
test( "testing tesseract" , async () => {
        let files = await promises.readdir('./tesseract_images')
        
            await worker.load();
          await worker.loadLanguage('eng');
          await worker.initialize('eng');
          
          const { data: { text } } = await worker.recognize(`./tesseract_images/captcha.ashx.jpg`);
          console.log(text)
          await worker.terminate();
        
        
        
})