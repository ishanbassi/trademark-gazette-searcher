import {promises as fsPromise} from 'fs'
import path from 'path'


import { extractPdfText } from './utilities/textExtraction'
test('testing pdf extract' , async () => {
    extractPdfText('./pdfs/journal 2047/document2.pdf').then(async res => await fsPromise.writeFile('pdf1.json', JSON.stringify(res))).catch(async err => console.log( await err))
    
})