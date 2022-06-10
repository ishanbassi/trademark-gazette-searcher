import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import { DoubleMetaphone, Metaphone} from 'natural'
import { promises } from "fs";
const pdfExtract =  new PDFExtract()

export interface TmDataInterface {
    page_no:number,
    journal_no:number,
    trademark:string,
    details:string,
    tm_class:number,
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
                let trademark:string = '', details = '',
                regExp = new RegExp(/Trade Marks Journal No:\s+(\d\d\d\d).+Class\s+(\d\d?)/),
                isImgTm , journal_no , tm_class
                
                page.content.forEach( (data,i) => {
                    // only trademarks are having height of 23.94
                    if (data.height >= 23 && data.height <= 24 && data.x >= 58 && data.x<= 59){
                         trademark += `${data.str.toUpperCase()}`
                        
                    }
                    else if (regExp.test(data.str)) {
                        [,journal_no, tm_class]  = data.str.match(regExp)
                        isImgTm = true
                    }
                    else{
                        details += `${data.str} `
                    }
                })
                if (trademark || isImgTm) {
                    
                    const tm_phonetics = Metaphone.process(trademark)
                    const [,appNo] = details.match(/\d{7}/)
                    
                    content.push({
                        page_no:page.pageInfo.num,
                        journal_no:parseInt(journal_no),
                        trademark,
                        details,
                        tm_class:parseInt(tm_class),
                        tm_phonetics,
                        appNo:parseInt(appNo)
                    
                    })
                    
                }
                   
            })
            resolve(content)
        })
    })
}





