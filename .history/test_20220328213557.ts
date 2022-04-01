import { PDFExtract } from "pdf.js-extract";
import { promises as fsPromises } from "fs";



const pdfExtract =  new PDFExtract()


pdfExtract.extract('trademark_gazette.pdf',{
    normalizeWhitespace:true,
    disableCombineTextItems:true
}, (err, data) => {
    if(err) return console.log(err)
    const content = []
    
    data.pages.forEach((page, i) =>{
        let trademark:string, details= [];
        page.content.forEach((data,i) => {
            // only trademarks are having height of 23.94
            if (data.height == 23.94){
                 trademark = data.str
                 page.content.splice(i,1)
            }else details.push(data.str)
            
            
            
        })
        if (trademark) {
            details.splice(0,4)
            details.join('')
            content.push({
                page:page.pageInfo.num,
                trademark,
                details

            })
        }
        
        
    } )
    console.log(content.length)  
     fsPromises.writeFile('gazette.json', JSON.stringify(content,null, '\t'))
})
