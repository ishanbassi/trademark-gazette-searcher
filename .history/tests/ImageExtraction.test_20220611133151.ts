/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

//
// Basic node example that prints document metadata and text content.
// Requires single file built version of PDF.js -- please run
// `gulp singlefile` before running the example.
//

// Run `gulp dist-install` to generate 'pdfjs-dist' npm package files.
export{}

const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

import { PNG } from "pngjs";
import { getDocument } from "pdfjs-dist";
jest.setTimeout(100000)
import { promises , createWriteStream }from "fs";

import { Metaphone} from 'natural'
import { PDFDocumentLoadingTask } from "pdfjs-dist";
import {TextItem} from 'pdfjs-dist/types/src/display/api'


test('extraction', async () => {
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
  const pdfPath = await promises.readFile('./pdfs/2041/journal 2041 30-34.pdf')
  const loadingTask:PDFDocumentLoadingTask = await pdfjsLib.getDocument({
    data: pdfPath,
    
    
  })
  loadingTask.promise.then(async doc => {
    let totalPages =  doc.numPages , trademark:string = '', details = ''
    for (let pageNo=1;pageNo <= totalPages; pageNo++){
      const page = await doc.getPage(pageNo)
      const textContent = await page.getTextContent()
      const operators = await page.getOperatorList()
      const isImgTm = operators.fnArray.some((f) => f === pdfjsLib.OPS.paintImageXObject)
      
      textContent.items.map((data:TextItem) => {
        if (data.height >= 23 && data.height <= 24 && data.transform[4] >= 58 && data.transform[4]<= 59){
          trademark += `${data.str.toUpperCase()}`
        }
        else{
          details += data.str
          console.log('hi')
        }

      })
      if (trademark ) {
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
    
    await promises.writeFile('pdf1.json', JSON.stringify(content) , {encoding:'utf8'})
  })
  
  
})

