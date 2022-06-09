export {}
jest.setTimeout(100000)
import { promises } from 'fs'; 
import { createWorker , PSM} from 'tesseract.js';
 
const worker = createWorker({
  logger: m => m
});
 
test( "testing tesseract" , async () => {

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({})
        let result = []
        let files = await promises.readdir('./tesseract_images')
        files.forEach(async (file) => {
          // const { data: { text } } = await worker.recognize(`./tesseract_images/${file}`);
          console.log(`./tesseract_images/${file}`)
        })
        
        await worker.terminate();
})