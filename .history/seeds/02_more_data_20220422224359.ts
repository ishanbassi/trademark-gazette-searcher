import { Knex } from "knex";
import { extractPdfText } from "../utilities/textExtraction";
import { promises as fsPromise } from "fs";
import path from "path";

export const pdfIterator = {
    dir:'./pdfs',
    next: async function*  generator () {
        const dirents = await fsPromise.readdir(pdfIterator['dir'], {withFileTypes:true})
        for(const dirent of dirents) {
            pdfIterator['dir'] = path.resolve(pdfIterator['dir'], dirent.name)
            if(dirent.isDirectory()) {
                yield* generator()
            }else{
                yield pdfIterator['dir']
            }
        }
    },
    [Symbol.iterator]: function(){return this}
}

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tm_detail").truncate();

    // Inserts seed entries
        
        for(let pdf of pdfIterator ) {
            const trademarks = await extractPdfText(pdf)
            
            if(trademarks.length > 0) await knex('tm_detail').insert(trademarks)

        }
            
           
            
            
        
            
        
        
    
};
