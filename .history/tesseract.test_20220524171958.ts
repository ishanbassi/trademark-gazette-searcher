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
          tessedit_pageseg_mode:PSM.SINGLE_WORD
        })
        const { data: { text } } = await worker.recognize('./tesseract_images/490.jpg');
        console.log(text);
        await worker.terminate();
})