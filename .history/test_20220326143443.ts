
import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";
import { promises as fsPromises } from "fs";



const pdfExtract =  new PDFExtract()

pdfExtract.extract('trademark_gazette.pdf',{}, (err, data) => {
    if(err) return console.log(err)
    const content = []
    
    data.pages.forEach((page, i) =>{
        let trademark:string, details = []
        page.content.forEach((data , i)=>{
            
            if (data.height == 23.94) trademark = data.str
            if(data.y >= 157.74) details.push(data)
        })
        if (trademark) {
            
            content.push({
                page:page.pageInfo.num,
                trademark,
                details
            })
        }
        
        
    } )
    console.log(content.length)
    // fsPromises.writeFile('gazette.json', JSON.stringify(content,null, '\t'))
})
