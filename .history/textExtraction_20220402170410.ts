import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import {Metaphone, DoubleMetaphone} from 'natural'
import {db,closeConnection} from './dbConnection'



const pdfExtract =  new PDFExtract()

interface TmDataInterface {
    page_no:number,
    trademark:string,
    details:string,
    tm_class:string,
    tm_phonetics:string
}
export function extractPdfText(filePath:string, options?:PDFExtractOptions) {
    const content = []
    return new Promise<TmDataInterface[]>((resolve, reject) => {
        pdfExtract.extract(filePath,options,  (err, data) => {
            if(err){
                return reject(err)
                
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
                    const tm_phonetics = DoubleMetaphone.process(trademark)
                    const tmClass  = details.splice(0,3)[2]
                    content.push({
                        "page_no":page.pageInfo.num,
                        trademark,
                        details:details.join(' '),
                        'tm_class':tmClass,
                        tm_phonetics
                    })
                    
                }
                   
            })
            resolve(content)
        })
    })
}



const addTrademark = async (filePath:string) => {
    try{
        let trademarks = await extractPdfText(filePath)
        await db('tm_detail').insert(trademarks)
        await closeConnection()
    }catch(err) {
        console.log('no such file exists')
    }
}

const getTrademarks =  async () => {
    const tms = await db.select('trademark').from('tm_detail')
    console.log(tms)
}



