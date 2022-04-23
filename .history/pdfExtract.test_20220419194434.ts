import {promises as fsPromise} from 'fs'
import path from 'path'


import { extractPdfText } from './utilities/textExtraction'
test('testing pdf extract' , async () => {
    const data = await extractPdfText('./pdfs/journal 2044/abc.pdf')
    console.log(data)
})