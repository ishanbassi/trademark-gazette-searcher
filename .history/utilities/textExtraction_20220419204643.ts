import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import { DoubleMetaphone, Metaphone} from 'natural'

const pdfExtract =  new PDFExtract()

export interface TmDataInterface {
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
                    const tm_phonetics = Metaphone.process(trademark)
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





extractPdfText('./pdfs/journal 2044/abc.pdf').then(res => console.log(res)).catch(err => console.log(err))