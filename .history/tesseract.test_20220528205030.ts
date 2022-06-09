export {}
jest.setTimeout(100000)
import Tesseract from 'tesseract.js';

 

 
test( "testing tesseract" , async () => {
        
  Tesseract.recognize(
    './tesseract_images/2.jpg',
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
  })    
      
        
})