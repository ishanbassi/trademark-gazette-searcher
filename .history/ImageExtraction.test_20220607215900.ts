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
console.log(pdfjsLib)
import { PNG } from "pngjs";
import { getDocument } from "pdfjs-dist";

import { promises , createWriteStream }from "fs";

import { Metaphone} from 'natural'
import { PDFDocumentLoadingTask } from "pdfjs-dist";
import {TextItem} from 'pdfjs-dist/types/src/display/api'


test('extraction', async () => {
  const content = []  
  const pdfPath = await promises.readFile('1-5.pdf')
  const loadingTask:PDFDocumentLoadingTask = await pdfjsLib.getDocument({
    data: pdfPath,
    
  })
  loadingTask.promise
    .then(async function (doc) {
      let totalPages =  doc.numPages
      let pagePromises = []
      
   
        
        let trademark:string = '', details = ''
        const loadPage = async (pageNo) => {
          const page = await doc.getPage(pageNo);
          const operators = await page.getOperatorList()
          for(let j  = 0 ; j < operators.fnArray.length ; j++) {
            if(operators.fnArray[j] ===  await pdfjsLib.OPS.paintImageXObject) {
              let imageInfo =   page.objs.get(operators.argsArray[j][0]);
              
              
              const data = new Uint8ClampedArray(imageInfo.width * imageInfo.height * 4);
              let k = 0;
              let i = 0;
              while (i < imageInfo.data.length) {
               data[k] = imageInfo.data[i]; // r
               data[k + 1] = imageInfo.data[i + 1]; // g
               data[k + 2] = imageInfo.data[i + 2]; // b
               data[k + 3] = 255; // a
       
               i += 3;
               k += 4;
              }
              var img_png = new PNG({width: imageInfo.width, height: imageInfo.height});
              img_png.data = Buffer.from(data);
              img_png.pack().pipe(createWriteStream(`./testImgs/${j}.png`))
  
            }
          }
        
        
        }
        for(let page=1; page <= totalPages ; page++) {
          await loadPage(page)
        }
        
      
   

  })
  
  
  
})