export {
}
jest.setTimeout(10000)

import PDFJS from './pdfjs-build/pdf'
test('image extract' , () => {
    PDFJS.getDocument('./pdfs/2052/1-7.pdf').then((pdf) => {
        pdf.getPage(1).then(function getPageHelloWorld(page) {
            var scale = 1.5;
            var viewport = page.getViewport(scale);
            console.log(viewport)
        })
    })
})