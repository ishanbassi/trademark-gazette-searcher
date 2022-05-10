import { Knex } from "knex";
import { pdfIterator } from "../utilities/dirIterator";
import { extractPdfText } from "../utilities/textExtraction";
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tm_detail").truncate();

    // Inserts seed entries
    await knex('tm_detail').update('journal_no',1)

};
