import { Knex } from "knex";
import { extractPdfText } from "../utilities/textExtraction";
import { promises as fsPromise } from "fs";
import path from "path";
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tm_detail").truncate();

    // Inserts seed entries
    const files = await  fsPromise.readdir('./pdfs' )
    await Promise.all(files.map(async file => {
        return await extractPdfText(path.join('./pdfs', file))
    }))
};
