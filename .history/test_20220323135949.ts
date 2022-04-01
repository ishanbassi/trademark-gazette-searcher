import { PDFExtract } from "pdf.js-extract";


const pdfExtract =  new PDFExtract()
pdfExtract.extract('javascript 1.pdf',{firstPage:1, lastPage:6}, (err, data) => {
    if(err) return console.log(err)
    return console.log(data.pages)
})