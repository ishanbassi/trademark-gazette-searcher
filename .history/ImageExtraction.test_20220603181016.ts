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
import { promises } from "fs";
import { PDFDocumentLoadingTask } from "pdfjs-dist";


test('extraction', async () => {
    
// Loading file from file system into typed array
const pdfPath = await promises.readFile('1-5.pdf')

// Will be using promises to load document, pages and misc data instead of
// callback.
const loadingTask:PDFDocumentLoadingTask = pdfjsLib.getDocument(pdfPath);
    await loadingTask.promise
    .then(async function (doc) {
      console.log(await (await (await doc.getPage(100)).getTextContent().str))
  })
  
})