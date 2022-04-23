import { Knex } from "knex";
import { extractPdfText } from "../utilities/textExtraction";
import { promises as fsPromise } from "fs";
import path from "path";
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
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tm_detail").truncate();

    // Inserts seed entries
    
        const pdfDirIterable:Generator<Promise<string>> = generator('./pdfs')
        if(await  pdfDirIterable.next().value === false){
            const trademarks = await extractPdfText(pdfDirIterable.next().value)
            if(trademarks.length > 0) await knex('tm_detail').insert(trademarks)
        }
        
    
};
