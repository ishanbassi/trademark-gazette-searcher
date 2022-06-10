export {}
jest.setTimeout(100000)
import Tesseract from 'tesseract.js';

 

 
test( "testing tesseract" , async () => {
        
  Tesseract.recognize(
    'https://tesseract.projectnaptha.com/img/eng_bw.png',
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
  })    
      
        
})