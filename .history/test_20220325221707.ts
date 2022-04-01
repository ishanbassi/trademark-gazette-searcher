
import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";
import { promises as fsPromises } from "fs";



const pdfExtract =  new PDFExtract()

pdfExtract.extract('trademark_gazette.pdf',{}, (err, data) => {
    if(err) return console.log(err)
    const content = []
    
    data.pages.forEach((page, i) =>{
        let trademark, details = {};
        page.content.forEach((data , i)=>{
            
            if (data.height == 23.94) trademark = data.str
            else details['detail'] += data.str
        })
        if (trademark) {
            content.push({
                page:page.pageInfo.num,
                trademark:trademark.str,
                details
            })
        }
        
        
    } )

    fsPromises.writeFile('gazette.json', JSON.stringify(content,null, '\t'))
})
