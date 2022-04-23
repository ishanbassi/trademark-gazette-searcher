import {promises as fsPromise} from 'fs'
import path from 'path'
jest.setTimeout(10000)

import { extractPdfText } from './utilities/textExtraction'
test('testing pdf extract' , async () => {
    const result  = await extractPdfText('./pdfs/journal 2047/document2.pdf')
    await fsPromise.writeFile('pdf2.json', JSON.stringify(result), {encoding:'utf-8'})
    
})