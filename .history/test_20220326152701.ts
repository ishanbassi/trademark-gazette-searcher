
import { PDFExtract } from "pdf.js-extract";
import { inspect } from "util";
import { promises as fsPromises } from "fs";



const pdfExtract =  new PDFExtract()

pdfExtract.extract('trademark_gazette.pdf',{}, (err, data) => {
    if(err) return console.log(err)
    const content = []
    
    data.pages.forEach((page, i) =>{
        let trademark:string, details:string[] = []
        page.content.forEach((data , i)=>{
            // only trademarks are having height of 23.94
            if (data.height == 23.94) trademark = data.str
            
            // excluding non important details using y coordinate
            if(data.y >= 157.74) details.push(data.str)
        })
        if (trademark) {
            const [appNoAndDate, proprietor, ...other] = details
            content.push({
                page:page.pageInfo.num,
                trademark,
                appNoAndDate, proprietor, other
            })
        }
        
        
    } )
    
     fsPromises.writeFile('gazette.json', JSON.stringify(content,null, '\t'))
})
