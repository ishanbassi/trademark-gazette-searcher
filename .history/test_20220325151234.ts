
import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";
import { promises as fsPromises } from "fs";



const pdfExtract =  new PDFExtract()

pdfExtract.extract('trademark_gazette.pdf',{}, (err, data) => {
    if(err) return console.log(err)
    const content = {}
    data.pages.map(page => content[page.pageInfo.num] =  page.content)
    fsPromises.writeFile('gazette.json', JSON.stringify(content,null, '\t'))
})
