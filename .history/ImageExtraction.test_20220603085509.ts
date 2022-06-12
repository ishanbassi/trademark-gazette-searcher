export {
}

const pdfjs = require('pdfjs')
const pdf = require("./pdfjs-build/pdf.sandbox")

test('ishan', () => {
    pdfjs.getDocument('./pdfs/2052/1-7.pdf')
})