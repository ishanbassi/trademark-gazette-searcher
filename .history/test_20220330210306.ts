import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import { promises as fsPromises } from "fs";
import {db,closeConnection} from './dbConnection'



const pdfExtract =  new PDFExtract()

function extractPdfText(filePath:string, options?:PDFExtractOptions) {
    pdfExtract.extract(filePath,options, (err, data) => {
        if(err) return console.log(err)
        const content = []
        data.pages.forEach(async (page, i) =>{
            let trademark:string, details= [];
            page.content.forEach( (data,i) => {
                // only trademarks are having height of 23.94
                if (data.height == 23.94){
                     trademark = data.str
                     page.content.splice(i,1)
                }else details.push(data.str)
                
                
            })
            if (trademark) {
                details.splice(0,4)
                await db('tm_detail').insert({
                    "page_no":page.pageInfo.num,
                    trademark,
                    details: details.join(' ')
                })
            }
            
            
        })
        
         
    })
    
}

db("tm_detail").insert({
    "page_no":1,
    
})
