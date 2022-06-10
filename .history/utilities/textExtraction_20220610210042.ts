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
    tm_phonetics:string,
    appNo:number
}
export function extractPdfText(filePath:string, options?:PDFExtractOptions) {
    const content = []
    const pushToContent  = (page_no, journal_no, trademark, details, tm_class, tm_phonetics, application_no) => {
        
        content.push({
            page_no,
            journal_no:parseInt(journal_no),
            trademark,
            details,
            tm_class:parseInt(tm_class),
            tm_phonetics,
            application_no:parseInt(application_no)
        
        })
    }
    return new Promise<TmDataInterface[]>((resolve, reject) => {
        pdfExtract.extract(filePath,options,  (err, data) => {
            if(err){
                
                return reject(err)
                
            } 
            
            data.pages.forEach((page, i) =>{
                let trademark:string = '', details = '',
                regExp = new RegExp(/Trade Marks Journal No:\s+(\d{4}).+Class\s+(\d{1,2})/),

                regExp2 = new RegExp(/Trade Marks Journal No:\s+\d\s/),
                isImgTm , journal_no , tm_class
                
                page.content.forEach( (data,i) => {
                    // only trademarks are having height of 23.94
                    if (data.height >= 23 && data.height <= 24 && data.x >= 58 && data.x<= 59){
                         trademark += `${data.str.toUpperCase()}`
                        
                    }
                    else if (regExp.test(data.str) || regExp2.test(data.str)  ) {
                        // joining two strings for journal and class matching
                        let str = data.str.concat(page.content[i+1].str, page.content[i+2].str)
                        console.log(str)
                        isImgTm = true
                        let result  = str.match(regExp)
                        journal_no = result[1]  , tm_class = result[2]

                    }
                    else{
                        details += `${data.str}!!`
                    }
                })
                if (trademark || isImgTm) {
                    const tm_phonetics = Metaphone.process(trademark)
                    const [appNo] = details.match(/\d{7}/)
                    
                    if (parseInt(tm_class) == 99) {
                        let tmClasses = [...details.matchAll(/Cl.(\d{1,2});/g)]
                        tmClasses.forEach(tmClass => {
                            console.log(tmClass[1])
                            pushToContent(page.pageInfo.num,journal_no,trademark,details,tmClass[1],tm_phonetics,appNo)
                        })
                    }else{
                        pushToContent(page.pageInfo.num,journal_no,trademark,details,tm_class,tm_phonetics,appNo)
                    }
                    
                    
                }
                   
            })
            resolve(content)
        })
    })
}





