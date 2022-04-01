import { PDFExtract } from "pdf.js-extract";

const pdfExtract =  new PDFExtract()
pdfExtract.extract('',{}, (err, data) => {
    if(err) return console.log(err)
    return console.log(data)
})