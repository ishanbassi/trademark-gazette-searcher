import {promises as fsPromise} from 'fs'
import path from 'path'
import { extractPdfText } from './utilities/textExtraction'

test('pdf list generated' , async () => {
    const files = await  fsPromise.readdir(path.join(process.cwd(),'pdfs' ) )
    const filesData = await Promise.all(files.map(file => {
        return fsPromise.readFile(path.join(process.cwd(),'pdfs', file), {encoding:'utf-8'})
    }))
    console.log(filesData)
})

// I WAS WORKING ON HOW TO READ ALL PDFS....