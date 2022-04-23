import {promises as fsPromise} from 'fs'
import { extractPdfText } from './utilities/textExtraction'

test('pdf list generated' , async () => {
    const files = await  fsPromise.readdir('/pdfs', )
    console.log(files)
})