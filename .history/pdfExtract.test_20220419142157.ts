import {promises as fsPromise} from 'fs'
import path from 'path'


import { extractPdfText } from './utilities/textExtraction'

test('reading dirs recursively' ,async () => {
    async function*  generator (dir:string) {
        const dirents = await fsPromise.readdir(dir, {withFileTypes:true})
        for(const dirent of dirents) {
            const res = path.resolve(dir, dirent.name)
            if(dirent.isDirectory()) {
                yield* generator(res)
            }else{
                yield res
            }
        }
    }
    
    for await (const result of generator('./pdfs')) {
        console.log(result)
    }
})

// I WAS WORKING ON HOW TO READ ALL PDFS....