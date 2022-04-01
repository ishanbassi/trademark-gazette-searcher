"use strict";
exports.__esModule = true;
var pdf_js_extract_1 = require("pdf.js-extract");
var pdfExtract = new pdf_js_extract_1.PDFExtract();
pdfExtract.extract('javascript 1.pdf', { firstPage: 1, lastPage: 6 }, function (err, data) {
    if (err)
        return console.log(err);
    return console.log(data);
});
