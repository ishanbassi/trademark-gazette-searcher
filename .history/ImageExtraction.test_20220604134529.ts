/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

//
// Basic node example that prints document metadata and text content.
// Requires single file built version of PDF.js -- please run
// `gulp singlefile` before running the example.
//

// Run `gulp dist-install` to generate 'pdfjs-dist' npm package files.
export{}
jest.setTimeout(20000)
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
import { promises } from "fs";
import { Metaphone} from 'natural'
import { PDFDocumentLoadingTask } from "pdfjs-dist";
import {TextItem} from 'pdfjs-dist/types/src/display/api'


test('extraction', async () => {
    
  const pdfPath = await promises.readFile('1-5.pdf')
  const loadingTask:PDFDocumentLoadingTask = pdfjsLib.getDocument(pdfPath);
  const content = []
    await loadingTask.promise
    .then(async function (doc) {
      let totalPages =  doc.numPages
      let pagePromises = []
      console.log(totalPages)      

      const loadPage = async (page) => {
        let trademark:string = '', details: string[] = [] 
         return  doc.getPage(page)
        .then(res =>{
          
          return res.getTextContent()
        })
        .then(pageContent => {
          
          pageContent.items.forEach((data:TextItem) => {
            
            if (data.height >= 23 && data.height <= 24 && data.transform[4] >= 58 && data.transform[4]<= 59){
              trademark += `${data.str.toUpperCase()}`
            }
            else{
              details.push(data.str)
            }
          })
          if (trademark) {
                      
            const tm_phonetics = Metaphone.process(trademark)
            // const journalAndClass = details.splice(0,3).join('')
            // const[ ,journal,tmClass] = journalAndClass.match(/Trade Marks Journal No:\s+(\d\d\d\d).+Class\s+(\d\d?)/)
            
            content.push({
                "page_no":page,
            
                trademark,
                details:details,
            
                tm_phonetics
            })
            
        }
          
        })
      }  
      for (let page=1; page <= totalPages ; page++) {
        pagePromises.push(loadPage(page))
      }
      await Promise.all(pagePromises).then(async () => await promises.writeFile('pdf1.json', JSON.stringify(content),{encoding:'utf8'}))
  })
  
})