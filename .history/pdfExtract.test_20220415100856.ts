import {promises as fsPromise} from 'fs'
import path from 'path'

import { extractPdfText } from './utilities/textExtraction'

test('pdf list generated' , async () => {
    const files = await  fsPromise.readdir(path.join(process.cwd(),'pdfs' ) )
    const pdfText = await extractPdfText(path.join(process.cwd(),'pdfs', files[2]))
    await fsPromise.writeFile('testing.json', JSON.stringify(pdfText))
    
})

// I WAS WORKING ON HOW TO READ ALL PDFS....