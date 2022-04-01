import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";


const pdfExtract =  new PDFExtract()
pdfExtract.extract('javascript 1.pdf',{firstPage:6, lastPage:16}, (err, data) => {
    if(err) return console.log(err)
    return console.log(inspect(data.pages[1].content))
})