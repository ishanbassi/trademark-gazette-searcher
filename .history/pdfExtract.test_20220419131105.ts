import {promises as fsPromise} from 'fs'
import path from 'path'


import { extractPdfText } from './utilities/textExtraction'

test('reading dirs recursively' , async () => {
    const files = await fsPromise.readdir('/pdfs')
    console.log(files)
})

// I WAS WORKING ON HOW TO READ ALL PDFS....