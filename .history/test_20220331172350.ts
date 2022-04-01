import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";

import {db,closeConnection} from './dbConnection'



const pdfExtract =  new PDFExtract()


function extractPdfText(filePath:string, options?:PDFExtractOptions) {
    const content = []
    return new Promise((resolve, reject) => {
        pdfExtract.extract(filePath,options,  (err, data) => {
            if(err)  reject(err)
            
            data.pages.forEach((page, i) =>{
                let trademark:string, details: string[] = [];

                page.content.forEach( (data,i) => {
                    // only trademarks are having height of 23.94
                    if (data.height == 23.94){
                         trademark = data.str
                         page.content.splice(i,1)
                    }else details.push(data.str)        
                })
                if (trademark) {
                    // removing non important information
                    
                    
                    content.push({
                        "page_no":page.pageInfo.num,
                        trademark,
                        details
                    })
                    
                }
                   
            })
            resolve(content)
        })
    })
}



const a = async () => {
    let b = await extractPdfText('trademark_gazette.pdf')
    console.log(b[3])
}