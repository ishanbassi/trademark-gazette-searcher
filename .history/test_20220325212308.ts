
import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";
import { promises as fsPromises } from "fs";



const pdfExtract =  new PDFExtract()

pdfExtract.extract('trademark_gazette.pdf',{}, (err, data) => {
    if(err) return console.log(err)
    const content = []
    
    data.pages.forEach((page, i) =>{
        const trademarks = page.content.find(data => data.height == 23.94)
        content.push({[page.pageInfo.num]:trademarks.str})
    } )

    fsPromises.writeFile('gazette.json', JSON.stringify(content,null, '\t'))
})
