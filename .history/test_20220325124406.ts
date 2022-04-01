
import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";
import { promises as fsPromises } from "fs";



const pdfExtract =  new PDFExtract()

pdfExtract.extract('trademark_gazette.pdf',{firstPage:2, lastPage:2}, (err, data) => {
    if(err) return console.log(err)
    const content = {}
    data.pages.map(page =>  fsPromises.writeFile('gazette.json', JSON.stringify(page.content,null, '\n')))
    
})
