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
console.log(pdfjsLib.OPS)
import { PNG } from "pngjs";
import { getDocument } from "pdfjs-dist";
jest.setTimeout(100000)
import { promises , createWriteStream }from "fs";

import { Metaphone} from 'natural'
import { PDFDocumentLoadingTask } from "pdfjs-dist";
import {TextItem} from 'pdfjs-dist/types/src/display/api'


test('extraction', async () => {
  const content = []  
  const pdfPath = await promises.readFile('./pdfs/2053/39-99.pdf')
  const loadingTask:PDFDocumentLoadingTask = await pdfjsLib.getDocument({
    data: pdfPath,
  })
  const docProxy = await loadingTask.promise
    .then(async function (doc) {
      let totalPages =  doc.numPages
      let pagePromises = Promise.resolve()
          
        let trademark:string = '', details = ''
        const loadPage = async (pageNo) => {
          
          const page = await doc.getPage(pageNo);
          const operators = await page.getOperatorList()
          for(let j  = 0 ; j < operators.fnArray.length ; j++) {
            if(operators.fnArray[j] ===  await pdfjsLib.OPS.paintImageXObject) {
              
              let imageInfo =   page.objs.get(operators.argsArray[j][0]);
                 
              
              
              let img_png = new PNG({width: imageInfo.width, height: imageInfo.height});
              img_png.data = Buffer.from(imageInfo.data);
              img_png.pack().pipe(createWriteStream(`./testImgs/${pageNo}.png`))
  
            }
          }
        }
        for(let page=1; page <= totalPages ; page++) {
          
          pagePromises = pagePromises.then(() => loadPage(page))
        }
          
        
         
          
            
   

  })
  
  
  
})