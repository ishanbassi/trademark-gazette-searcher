"use strict";
exports.__esModule = true;
var pdf_js_extract_1 = require("pdf.js-extract");
var pdfExtract = new pdf_js_extract_1.PDFExtract();
pdfExtract.extract('the-road-to-learn-react.pdf', { firstPage: 2, lastPage: 6 }, function (err, data) {
    if (err)
        return console.log(err);
    return console.log(data.pages);
});
