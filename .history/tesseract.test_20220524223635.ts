export {}
jest.setTimeout(100000)
import { promises } from 'fs'; 
import { createWorker , PSM} from 'tesseract.js';
 
const worker = createWorker({
  logger: m => m
});
 
test( "testing tesseract" , async () => {

        
        let result = []
        let files = await promises.readdir('./tesseract_images')
        files.forEach(async (file) => {
          await worker.load();
          await worker.loadLanguage('eng');
          await worker.initialize('eng');
          await worker.setParameters({})
          const { data: { text } } = await worker.recognize(`./tesseract_images/${file}`);
          console.log(text)
          await worker.terminate();
        })
        
        
})