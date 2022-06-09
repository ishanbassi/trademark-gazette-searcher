export {}
jest.setTimeout(100000)
import { createWorker , PSM} from 'tesseract.js';
 import Jimp from 'jimp';
const worker = createWorker({
  logger: m => m
});
 
test( "testing tesseract" , async () => {
      
            await Jimp.read('./tesseract_images/15.jpg')
            .then(lenna => {
              return lenna
                .scale(1.2,Jimp.RESIZE_BICUBIC)
                
                .quality(100) // set JPEG quality
                .greyscale() // set greyscale
                .contrast(1)
                
                .write('./tesseract_images/10-jimp.jpg'); // save
            })
            .catch(err => {
              console.error(err);
            });
            await worker.load();
          await worker.loadLanguage('eng');
          await worker.initialize('eng'); 
          await worker.setParameters({
            
          });
          const { data: { text } } = await worker.recognize(`./tesseract_images/10-jimp.jpg`);
          console.log(text)
          await worker.terminate();
        
        
        
})