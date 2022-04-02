import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";

import {db,closeConnection} from './dbConnection'



const pdfExtract =  new PDFExtract()


function extractPdfText(filePath:string, options?:PDFExtractOptions) {
    const content = []
    return new Promise((resolve, reject) => {
        pdfExtract.extract(filePath,options,  (err, data) => {
            if(err){
                reject(err)
                console.log('pdf not found')
                return 
            } 
            
            data.pages.forEach((page, i) =>{
                let trademark:string, details: string[] = []

                page.content.forEach( (data,i) => {
                    // only trademarks are having height of 23.94
                    if (data.height == 23.94){
                         trademark = data.str.toUpperCase()
                        
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

const getTrademarks =  async () => {
    const tms = await db.select('trademark').from('tm_detail')
    console.log(tms)
}
addTrademark('./pdf/trademark_gazette.pdf')


