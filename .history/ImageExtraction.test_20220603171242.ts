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
    
    

    let lastPromise; // will be used to chain promises
    lastPromise = doc.getMetadata().then(function (data) {
      console.log("# Metadata Is Loaded");
      console.log("## Info");
      console.log(JSON.stringify(data.info, null, 2));
      console.log();
      if (data.metadata) {
        console.log("## Metadata");
        console.log(JSON.stringify(data.metadata.getAll(), null, 2));
        console.log();
      }
    });

    
    
  })
  
})