import {promises as fsPromise} from 'fs'
import path from 'path'

jest.setTimeout(100000)
import { extractPdfText } from '../utilities/textExtraction'
test('testing pdf extract' , async () => {
    const result  = await extractPdfText('./pdfs/2045/16-24.pdf')
    
    await fsPromise.writeFile('pdf1.json', JSON.stringify(result) , {encoding:'utf8'})
    
    
})