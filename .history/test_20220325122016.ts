
import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";
import { promises as fsPromises } from "fs";



const pdfExtract =  new PDFExtract()

pdfExtract.extract('trademark_gazette.pdf',{firstPage:2, lastPage:4}, (err, data) => {
    if(err) return console.log(err)
    const content = {}
    data.pages.map((page, i) => content[i] = page.content)
    fsPromises.writeFile('gazette.json', JSON.stringify(content))
    
})
