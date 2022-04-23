import { Knex } from "knex";
import { extractPdfText } from "../utilities/textExtraction";
import { promises as fsPromise } from "fs";
import path from "path";

export const pdfIterator = {
    dir:'./pdfs',
    next:async function* generator (){
        
        const dirents = await fsPromise.readdir(this.dir, {withFileTypes:true})
        for(let dirent of dirents){
            this.dir = path.resolve(this.dir, dirent.name)
            if(dirent.isDirectory()) yield this.dir
            else{
                yield this.dir
            }

        }
        
    },
    [Symbol.asyncIterator]: async function() {return this.next}
    
    
}

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tm_detail").truncate();

    // Inserts seed entries
        
        for await (let   pdf of pdfIterator ) {
            const trademarks = await extractPdfText(pdf)
            
            if(trademarks.length > 0) await knex('tm_detail').insert(trademarks)

        }
            
           
            
            
        
            
        
        
    
};
