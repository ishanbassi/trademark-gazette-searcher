import {promises as fsPromise} from 'fs'
import path from 'path'

jest.setTimeout(10000)
import { extractPdfText } from '../utilities/textExtraction'
import { argv } from 'process'

test('testing pdf extract' , async () => {
    const result  = await extractPdfText(`./pdfs/${argv[3]}/${argv[4]}`)
    fsPromise.writeFile('pdf.json', JSON.stringify(result,null,4) , {encoding:"utf-8"})
    
    
    
    
})