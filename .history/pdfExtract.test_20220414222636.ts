import {promises as fsPromise} from 'fs'
import path from 'path'
import { extractPdfText } from './utilities/textExtraction'

test('pdf list generated' , async () => {
    const files = await  fsPromise.readdir(path.join(process.cwd(),'pdfs' ) )
    console.log(files)
})