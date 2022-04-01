import { PDFExtract } from "pdf.js-extract";
import { promises as fsPromises } from "fs";
import * as pdfjsLib from './pdf'


function gettext(pdfUrl){
    var pdf = pdfjsLib.getDocument(pdfUrl);
    return pdf.then(function(pdf) { // get all pages text
      var maxPages = pdf.pdfInfo.numPages;
      var countPromises = []; // collecting all page promises
      for (var j = 1; j <= maxPages; j++) {
        var page = pdf.getPage(j);
  
        var txt = "";
        countPromises.push(page.then(function(page) { // add page promise
          var textContent = page.getTextContent();
          return textContent.then(function(text){ // return content promise
            return text.items.map(function (s) { return s.str; }).join(''); // value page text 
          });
        }));
      }
      // Wait for all pages and join text
      return Promise.all(countPromises).then(function (texts) {
        return texts.join('');
      });
    });
  }
  
  // waiting on gettext to finish completion, or error
  gettext("https://cdn.mozilla.net/pdfjs/tracemonkey.pdf").then(function (text) {
    alert('parse ' + text);
  }, 
  function (reason) {
    console.error(reason);
  });
  
  
// const pdfExtract =  new PDFExtract()

// pdfExtract.extract('trademark_gazette.pdf',{}, (err, data) => {
//     if(err) return console.log(err)
//     const content = []
    
//     data.pages.forEach((page, i) =>{
//         let trademark:string, details:string[] = []
//         page.content.forEach((data , i)=>{
//             // only trademarks are having height of 23.94
//             if (data.height == 23.94) trademark = data.str
            
//             // excluding non important details using y coordinate
//             if(data.y >= 157.74) details.push(data.str)

            
//         })
//         if (trademark) {
//             const [appNoAndDate, proprietor, ...other] = details
            
//             content.push({
//                 page:page.pageInfo.num,
//                 trademark,
//                 appNoAndDate, proprietor, other
//             })
//         }
        
        
//     } )
    
//      fsPromises.writeFile('gazette.json', JSON.stringify(content,null, '\t'))
// })
