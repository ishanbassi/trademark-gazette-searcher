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
    const page = await doc.getPage(6)
    const content = await page.getTextContent()
    const text = content.items.map((data:TextItem) => data.str)
    promises.writeFile('pdf1.json', JSON.stringify(text) , {encoding:'utf8'})
  })
  
  
})

