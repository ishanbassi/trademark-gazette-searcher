export {}
import Tesseract from 'tesseract.js';
 
test("testing ocr" , async  () => {
        await Tesseract.recognize(
        '88.jpg',
        'eng',
        { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
        console.log(text);
        })
})