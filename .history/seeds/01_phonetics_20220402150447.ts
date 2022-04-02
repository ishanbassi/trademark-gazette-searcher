import { Knex } from "knex";
import { db, closeConnection } from "../dbConnection";
import { createPhonetics } from "../tmSearcher";


export async function seed(knex: Knex): Promise<void> {
    
    const trademarks = await createPhonetics('tm_detail')
    return trademarks.forEach(async tm => {
        await knex("tm_detail").where('id', tm.id).update({
            'tm_phonetics':JSON.stringify(tm.phonetics)
        })
        await closeConnection()
    })
};
seed(db)