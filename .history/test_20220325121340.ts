
import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";
import { promises as fsPromises } from "fs";



const pdfExtract =  new PDFExtract()

pdfExtract.extract('trademark_gazette.pdf',{firstPage:2, lastPage:4}, (err, data) => {
    if(err) return console.log(err)
    data.pages.map(page => fsPromises.appendFile('gazette.json', JSON.stringify(page.content)))
    
})
