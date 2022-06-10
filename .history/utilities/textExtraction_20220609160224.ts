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
                let trademark:string = '', details: string[] = [],
                regExp = new RegExp(/Trade Marks Journal No:\s+(\d\d\d\d).+Class\s+(\d\d?)/),
                isImgTm 

                page.content.forEach( (data,i) => {
                    // only trademarks are having height of 23.94
                    if (data.height >= 23 && data.height <= 24 && data.x >= 58 && data.x<= 59){
                         trademark += `${data.str.toUpperCase()}`
                        
                    }
                    else if (regExp.test(data.str)) {
                        isImgTm = true
                        const remainingContent = page.content.splice(i++)
                        const contentText = remainingContent.map(data => data.str)
                        details.push(contentText.join(''))
                    }
                    
                    else{
                        details.push(data.str)
                    }
                })
                if (trademark || isImgTm) {
                    
                    const tm_phonetics = Metaphone.process(trademark)
                    const journalAndClass = details.splice(0,3).join('')
                    const[ ,journal,tmClass] = journalAndClass.match(/Trade Marks Journal No:\s+(\d\d\d\d).+Class\s+(\d\d?)/)
                    
                    content.push({
                        "page_no":page.pageInfo.num,
                        "journal_no":parseInt(journal),
                        trademark,
                        details:details.join(' '),
                        tm_class:parseInt(tmClass),
                        tm_phonetics
                    })
                    
                }
                   
            })
            resolve(content)
        })
    })
}




extractPdfText('./pdfs/2053/1-8.pdf').then(res => console.log(res)).catch(err => console.log(err))