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
                
                for(let i=0;i<page.content.length; i++){

                    if(page.content[i].str.includes('Trade Marks Journal No') && page.content[i].str.includes('Class')){
                        journalAndClass = page.content[i].str
                    }

                    // only trademarks are having height between 23 and 24
                    else if (page.content[i].height >= 23 && page.content[i].height <= 24 && page.content[i].x >= 58 && page.content[i].x<= 59 ){
                        trademark = page.content[i].str.toUpperCase()
                        details = page.content.splice(i).map(data => data.str)
                        
                        const tm_phonetics = Metaphone.process(trademark)
                        const [journal_no, tmClassRaw]  = journalAndClass.split(' ')
                        const [, tm_class] = tmClassRaw.split('Class')
                        content.push({
                            "page_no":`${page.pageInfo.num} - ${journal_no}` ,
                            trademark,
                            details:details.join(' '),
                            tm_class,
                            tm_phonetics,
                            
                        })
                        break;
                        
                    }
                    
                }             
            })
            resolve(content)  
        })
        
    })
    
}





