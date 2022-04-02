import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";

import {db,closeConnection} from './dbConnection'



const pdfExtract =  new PDFExtract()


function extractPdfText(filePath:string, options?:PDFExtractOptions) {
    const content = []
    return new Promise((resolve, reject) => {
        pdfExtract.extract(filePath,options,  (err, data) => {
            if(err)  reject(err)
            
            data.pages.forEach((page, i) =>{
                let trademark:string, details: string[] = []

                page.content.forEach( (data,i) => {
                    // only trademarks are having height of 23.94
                    if (data.height == 23.94){
                         trademark = data.str
                        
                    }
                    else{
                        details.push(data.str)
                    }
                })
                if (trademark) {
                    const tmClass  = details.splice(0,3)[2]

                    
                    
                    content.push({
                        "page_no":page.pageInfo.num,
                        trademark,
                        details:details.join(' '),
                        
                        'tm_class':tmClass
                    })
                    
                }
                   
            })
            resolve(content)
        })
    })
}



const addTrademark = async (filePath) => {
    let trademarks = await extractPdfText(filePath)
    await db('tm_detail').insert(trademarks)
    await closeConnection()
}

