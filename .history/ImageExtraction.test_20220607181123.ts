/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

//
// Basic node example that prints document metadata and text content.
// Requires single file built version of PDF.js -- please run
// `gulp singlefile` before running the example.
//

// Run `gulp dist-install` to generate 'pdfjs-dist' npm package files.
export{}
jest.setTimeout(100000)
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
console.log(pdfjsLib.OPS)
import { getDocument } from "pdfjs-dist";

import { promises } from "fs";

import { Metaphone} from 'natural'
import { PDFDocumentLoadingTask } from "pdfjs-dist";
import {TextItem} from 'pdfjs-dist/types/src/display/api'


test('extraction', async () => {
  const content = []  
  const pdfPath = await promises.readFile('1-5.pdf')
  const loadingTask:PDFDocumentLoadingTask = await pdfjsLib.getDocument(pdfPath)
  loadingTask.promise
    .then(async function (doc) {
      let totalPages =  doc.numPages
      let pagePromises = []
      
   
        
        let trademark:string = '', details = ''
        const page = await doc.getPage(12);
        const operators = await page.getOperatorList()
        for(let i = 0 ; i < operators.fnArray.length ; i++) {
          if(operators.fnArray[i] ===  await pdfjsLib.OPS.paintImageXObject) {
            let imageInfo =   page.objs.get(operators.argsArray[i][0]);
            console.log( imageInfo.data);
          }
        }
      
        
        
      
   

  })
  
  
  
})