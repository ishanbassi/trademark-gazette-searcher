const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");



jest.setTimeout(100000)
import { promises , createWriteStream }from "fs";

import { Metaphone} from 'natural'
import { PDFDocumentLoadingTask } from "pdfjs-dist";
import {TextItem} from 'pdfjs-dist/types/src/display/api'


export interface TmDataInterface {
    page_no:number,
    journal_no:number,
    trademark:string,
    details:string,
    tm_class:number,
    tm_phonetics:string,
    appNo:number
}


export async function extractPdfText(pdfPath)  {
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
    const content = []  
    const pdfRaw = await promises.readFile(pdfPath)
    const loadingTask:PDFDocumentLoadingTask = await pdfjsLib.getDocument({
      data: pdfRaw,
      
      
    })
    loadingTask.promise.then(async doc => {
      
      let totalPages =  doc.numPages , pagePromises = []
      
        const loadPage  = async (pageNo) => {
          let trademark:string = '', details = '' 
          const page = await doc.getPage(pageNo)
          const textContent = await page.getTextContent()
          const operators = await page.getOperatorList()
          const isImgTm = operators.fnArray.some((f) => f === pdfjsLib.OPS.paintImageXObject)
         
          textContent.items.forEach((data:TextItem) => {
            if (data.height >= 23 && data.height <= 24 && data.transform[4] >= 58 && data.transform[4]<= 59){
              trademark += `${data.str.toUpperCase()}`
            }
            else{
              details += data.str
      
            }
    
          })
          if (trademark || isImgTm ) {
            const tm_phonetics = Metaphone.process(trademark)
            const [appNo] = details.match(/\d{7}/)
            const [,journal_no] = details.match(/Trade Marks Journal No:\s+(\d{4})/)
            const [,tm_class] = details.match(/Class\s+(\d{1,2})/)
            if (parseInt(tm_class) == 99) {
                let tmClasses = [...details.matchAll(/Cl.(\d{1,2});/g)]
                tmClasses.forEach(tmClass => {
                    
                    pushToContent(pageNo,journal_no,trademark,details,tmClass[1],tm_phonetics,appNo)
                })
            }else{
                pushToContent(pageNo,journal_no,trademark,details,tm_class,tm_phonetics,appNo)
            }
            
            
        }
          
        }
        
      for(let pageNo = 1; pageNo <= totalPages ; pageNo++) {
        pagePromises.push(loadPage(pageNo))
      }
      return Promise.resolve(Promise.all(pagePromises))
      
    })
    
    
  }
  