import { Knex } from "knex";
import { db, closeConnection } from "../dbConnection";
import { createPhonetics } from "../tmSearcher";


export async function seed(knex: Knex): Promise<void> {

    const trademarks = await createPhonetics('tm_detail')
    trademarks.forEach(async tm => {
        await db("tm_detail").where('id', tm.id).update({
            'tm_phonetics':tm.phonetics
        })
        await closeConnection()
    })
};
