export {}
jest.setTimeout(100000)
import { createWorker , PSM} from 'tesseract.js';
 import Jimp from 'jimp';
const worker = createWorker({
  logger: m => m
});
 
test( "testing tesseract" , async () => {
      
            // await Jimp.read('lenna.png')
            // .then(lenna => {
            //   return lenna
            //     .scaleToFit(1191,2000 )
            //     .quality(100) // set JPEG quality
            //     .greyscale() // set greyscale
            //     .write('lena-small-bw.jpg'); // save
            // })
            // .catch(err => {
            //   console.error(err);
            // });
            await worker.load();
          await worker.loadLanguage('eng');
          await worker.initialize('eng'); 
          await worker.setParameters({
            
          });
          const { data: { text } } = await worker.recognize(`./tesseract_images/10.jpg`);
          console.log(text)
          await worker.terminate();
        
        
        
})