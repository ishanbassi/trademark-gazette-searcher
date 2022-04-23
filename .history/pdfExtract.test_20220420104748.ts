import {promises as fsPromise} from 'fs'
import path from 'path'


import { extractPdfText } from './utilities/textExtraction'
test('testing pdf extract' , async () => {
    const result  = await extractPdfText('./pdfs/journal 2047/document2.pdf')
    console.log(result)
    
})