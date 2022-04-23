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
    const gen = generator('./pdfs')
    while(true){
        const iterableResult = await gen.next()
            if(iterableResult.done) break;
        console.log(iterableResult.value)
    }
})

