import {promises as fsPromise} from 'fs'
import path from 'path'

jest.setTimeout(10000)
import { extractPdfText } from '../utilities/textExtraction'
import { argv } from 'process'

test('testing pdf extract' , async () => {
    const result  = await extractPdfText(argv[3])
    fsPromise.writeFile('pdf.json', JSON.stringify(result) , {encoding:"utf-8"})
    
    
    
    
})