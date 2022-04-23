import { Knex } from "knex";
import { extractPdfText } from "../utilities/textExtraction";
import { promises as fsPromise } from "fs";
import path from "path";

export const pdfIterator = {

    next: async function*  generator (dir:string='./pdfs') {
        const dirents = await fsPromise.readdir(dir, {withFileTypes:true})
        for(const dirent of dirents) {
            const res = path.resolve(dir, dirent.name)
            if(dirent.isDirectory()) {
                yield* generator(res)
            }else{
                yield res
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
