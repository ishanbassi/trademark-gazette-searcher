
import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";
import { promises as fsPromises } from "fs";



const pdfExtract =  new PDFExtract()

pdfExtract.extract('trademark_gazette.pdf',{}, (err, data) => {
    if(err) return console.log(err)
    const content = []
    
    data.pages.forEach((page, i) =>{
        let tmIndex;
        const trademark = page.content.find((data , i)=>{
            tmIndex = i
            if (data.height == 23.94)return true
            return false
        })
        if (trademark) {
            page.content.splice(tmIndex, 1)
            content.push({
                page:page.pageInfo.num,
                trademark:trademark.str,
                details:page.content
            })
        }
        
        
    } )

    fsPromises.writeFile('gazette.json', JSON.stringify(content,null, '\t'))
})
