import { promises as fsPromise } from "fs";
import path from "path";

export const pdfIterator = {
    dir:'./pdfs',
    [Symbol.asyncIterator]: async function* generator (dir=this.dir){
        
        const dirents = await fsPromise.readdir(dir, {withFileTypes:true})

        for(let dirent of dirents){
            const res = path.resolve(dir, dirent.name) 
            
            if(dirent.isDirectory()){
                yield* generator(res)
            } 
            else{
                yield res
            }

        }
        
    }
    
    
}