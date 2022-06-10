export{}

const PdfExtractor = require('pdf-extractor').PdfExtractor;

let outputDir = './imgExtraction',

pdfExtractor = new PdfExtractor(outputDir, {
    viewportScale: (width, height) => {
        //dynamic zoom based on rendering a page to a fixed page size 
        if (width > height) {
            //landscape: 1100px wide
            return 1100 / width;
        }
        //portrait: 800px wide
        return 800 / width;
    },
    pageRange: [1,5],
});

pdfExtractor.parse('./pdfs/2034/1-5.pdf').then(function () {
	console.log('# End of Document');
}).catch(function (err) {
	console.error('Error: ' + err);
})