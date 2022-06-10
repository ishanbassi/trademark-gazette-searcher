export {}
jest.setTimeout(100000)
import { promises } from 'fs'; 
import { createWorker , PSM} from 'tesseract.js';
 
const worker = createWorker({
  logger: m => console.log(m)
});
 
test( "testing tesseract" , async () => {

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({})
        let result = []
        let files = await promises.readdir('./tesseract_images')
        files.forEach(async (file) => {
          const { data: { text } } = await worker.recognize(`./tesseract_images/${file}`);
          result.push(text)
        })
        console.log(result)
        await worker.terminate();
})