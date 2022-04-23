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


                    // only trademarks are having height between 23 and 24
                     if (page.content[i].height >= 23 && page.content[i].height <= 24 && page.content[i].x >= 58 && page.content[i].x<= 59 ){
                        trademark = page.content[i].str.toUpperCase()
                        details = page.content.splice(i).map(data => data.str)
                        
                        const tm_phonetics = Metaphone.process(trademark)
                        const tm_class  = details.splice(0,3)[2]
                        
                        content.push({
                            "page_no":`${page.pageInfo.num}` ,
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
extractPdfText('./pdfs/journal 2045/document.pdf').then(async res => await promises.writeFile('pdf1.json', JSON.stringify(res), {encoding:'utf-8'}))




