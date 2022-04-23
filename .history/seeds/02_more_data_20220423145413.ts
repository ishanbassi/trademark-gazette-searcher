import { Knex } from "knex";
import { extractPdfText } from "../utilities/textExtraction";
import { promises as fsPromise } from "fs";
import path from "path";

export const pdfIterator = {
    dir:'./pdfs',
    next:async function*  generator () {
        console.log(this.dir)
        const dirents = await fsPromise.readdir('./pdfs', {withFileTypes:true})
        yield dirents[1].name
    },
    [Symbol.asyncIterator]: async function* generator (){
        
        const dirents = await fsPromise.readdir(this.dir, {withFileTypes:true})

        for(let dirent of dirents){
           
            this.dir = path.resolve(this.dir, dirent.name)
            console.log(this.dir)
            if(dirent.isDirectory()) yield* generator.bind(this)()
            else{
                yield 1
            }

        }
        
    }
    
    
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
