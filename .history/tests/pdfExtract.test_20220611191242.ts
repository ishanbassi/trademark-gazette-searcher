import {promises as fsPromise} from 'fs'
import path from 'path'

jest.setTimeout(10000)
import { extractPdfText } from '../utilities/textExtraction'
test('testing pdf extract' , async () => {
    await extractPdfText('./pdfs/2045/16-24.pdf').catch(err => console.log(err))
    
    
    
    
    
})