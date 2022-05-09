import {promises as fsPromise} from 'fs'
import path from 'path'
import { pdfIterator } from './seeds/02_more_data'
jest.setTimeout(10000)
import { extractPdfText } from './utilities/textExtraction'
test('testing pdf extract' , async () => {
    const result  = await extractPdfText('./pdfs/journal 2047/document8.pdf')
    await fsPromise.writeFile('pdf1.json', JSON.stringify(result), {encoding:'utf-8'})
    
})