import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import { DoubleMetaphone, Metaphone} from 'natural'
import { fstat, promises } from "fs";
import { resolve } from "path";
const pdfExtract =  new PDFExtract()

export interface TmDataInterface {
    page_no:number,
    trademark:string,
    details:string,
    tm_class:string,
    tm_phonetics:string
}
export  function extractPdfText(filePath:string, options?:PDFExtractOptions) {
    const content = []
    
    return new Promise<TmDataInterface[]>( (resolve, reject) => {
        
        pdfExtract.extract(filePath,options,  (err, data) => {
            
            if(err){ 
                return reject(err)
                
            } 
            
            data.pages.forEach( (page, i) =>{
                let trademark:string, details: string[] = [], journalAndClass:string
                
                page.content.forEach( (data,i) => {
                    
                    // only trademarks are having height of 23.94
                    if (data.height >= 23 && data.height <= 24 && data.x >= 58 && data.x <= 59 ){
                         trademark = data.str.toUpperCase()
                        
                    }
                    else if(data.str.includes('Trade Marks Journal No') && data.str.includes('Class')){
                        journalAndClass = data.str
                    }
                    else{
                        details.push(data.str)
                    }
                })
                if (trademark) {
                    
                    const tm_phonetics = Metaphone.process(trademark)
                    
                    const [journalRaw, tmClassRaw]  = journalAndClass.split(',')
                    const [, journal_no] = journalRaw.split('Trade Marks Journal No:')
                    const [, tm_class] = tmClassRaw.split('Class')
                    content.push({
                        "page_no":page.pageInfo.num,
                        trademark,
                        details:details.join(' '),
                        tm_class,
                        tm_phonetics,
                        journal_no
                    })
                    
                }
                   
            })
            resolve(content)  
        })
        
    })
    
}





