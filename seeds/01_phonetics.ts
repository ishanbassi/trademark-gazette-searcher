import { Knex } from "knex";
import { extractPdfText } from "../textExtraction";
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tm_detail").truncate();

    // Inserts seed entries
    const trademarks = await extractPdfText('./pdfs/trademark_gazette.pdf')
    await knex('tm_detail').insert(
        trademarks );
};
