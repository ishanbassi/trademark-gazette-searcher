import {promises as fsPromise} from 'fs'
import path from 'path'

jest.setTimeout(100000)
import { extractPdfText } from '../utilities/textExtraction'
test('testing pdf extract' , async () => {
    extractPdfText('./pdfs/2045/16-24.pdf').then(res => console.log(res)).catch(err => console.log(err))
    
    
    
    
    
})