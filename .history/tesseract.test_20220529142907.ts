export {}
jest.setTimeout(100000)
import { createWorker , PSM} from 'tesseract.js';
 import Jimp from 'jimp';
const worker = createWorker({
  logger: m => m
});
 
test( "testing tesseract" , async () => {
      
            await Jimp.read('./captcha.ashx.jpg')
            .then(lenna => {
              return lenna
                .scale(1.2,Jimp.RESIZE_BICUBIC)
                
                .quality(100) // set JPEG quality
                .greyscale() // set greyscale
                .contrast(1)
                
                .write('./captcha-jimp.jpg'); // save
            })
            .catch(err => {
              console.error(err);
            });
            await worker.load();
          await worker.loadLanguage('eng');
          await worker.initialize('eng'); 
          await worker.setParameters({
            tessedit_char_whitelist:'0123456789'
          })
          const { data: { text } } = await worker.recognize(`./captcha.ashx.jpg`);
          console.log(text)
          await worker.terminate();
        
        
        
})