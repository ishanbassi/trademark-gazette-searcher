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
  const pdfPath = await promises.readFile('./pdfs/2041/journal 2041 30-34.pdf')
  const loadingTask:PDFDocumentLoadingTask = await pdfjsLib.getDocument({
    data: pdfPath,
    
    
  })
  loadingTask.promise.then(async doc => {
    let totalPages =  doc.numPages
    for (let pageNo=1;pageNo <= totalPages; pageNo++){
      const page = await doc.getPage(pageNo)
      const textContent = await page.getTextContent()
      const text = textContent.items.map((data:TextItem) => data.str)
      content.push(text)
    }
    
    await promises.writeFile('pdf1.json', JSON.stringify(content) , {encoding:'utf8'})
  })
  
  
})

