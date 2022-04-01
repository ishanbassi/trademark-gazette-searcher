
import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";



const pdfExtract =  new PDFExtract()

pdfExtract.extract('certificate.pdf',{}, (err, data) => {
    if(err) return console.log(err)
    return console.log(inspect(data.pages[0].content.pop()))
})
