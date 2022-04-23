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
    const a = 5
    while(a == 5) {
        console.log((await gen.next()))
    }
})

