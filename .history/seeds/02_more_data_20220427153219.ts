import { Knex } from "knex";
import { extractPdfText } from "../utilities/textExtraction";
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

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries

    if(process.env.NODE_ENV == 'production')await knex("tm_details").truncate(); 
    else{await knex("tm_detail").truncate()}

    // Inserts seed entries
        
        for await (let   pdf of pdfIterator ) {
            const trademarks = await extractPdfText(pdf)
            
            if(trademarks.length > 0){
                if(process.env.NODE_ENV == "production")await knex('tm_details').insert(trademarks)
                else{await knex('tm_detail').insert(trademarks)}
            } 

        }
            
           
            
            
        
            
        
        
    
};
