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
                
                page.content.forEach((data ,i) =>  {
                    console.log(data.str)
                    if(data.str.includes('Trade Mark') && data.str.includes('Class')){
                        
                        journalAndClass = data.str
                    }

                    // only trademarks are having height between 23 and 24
                    else if (data.height >= 23 && data.height <= 24 && data.x >= 58 && data.x<= 59 ){
                        trademark = data.str.toUpperCase()
                        details = page.content.splice(i).map(data => data.str)
                        
                        const tm_phonetics = Metaphone.process(trademark)
                        
                        content.push({
                            "page_no":`${page.pageInfo.num}` ,
                            trademark,
                            details:details.join(' '),
                            tm_class:journalAndClass,
                            tm_phonetics,
                            
                        })
                        
                        
                    }
                    
                }    )         
            })
            resolve(content)  
        })
        
    })
    
}
extractPdfText('./pdfs/journal 2045/document4.pdf').then(async res => await promises.writeFile('pdf1.json', JSON.stringify(res), {encoding:'utf-8'}))




