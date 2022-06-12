import {promises as fsPromise} from 'fs'
import path from 'path'

jest.setTimeout(10000)
import { extractPdfText } from '../utilities/textExtraction'
test('testing pdf extract' , async () => {
    const result  = await extractPdfText('./pdfs/2051/99 (including IR).pdf')
    fsPromise.writeFile('pdf1.json', JSON.stringify(result) , {encoding:"utf-8"})
    
    
    
    
})