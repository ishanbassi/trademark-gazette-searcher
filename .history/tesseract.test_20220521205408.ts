export {}
import Tesseract from 'tesseract.js';
 
Tesseract.recognize(
  '547.jpg',
  'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
})