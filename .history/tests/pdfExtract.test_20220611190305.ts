import {promises as fsPromise} from 'fs'
import path from 'path'

jest.setTimeout(100000)
import { extractPdfText } from '../utilities/textExtraction'
test('testing pdf extract' , async () => {
    const result  = await extractPdfText('./pdfs/2041/journal 2045 16-24.pdf')
    console.log(result)
    // await fsPromise.writeFile('pdf1.json', JSON.stringify(result) , {encoding:'utf8'})
    
    
})