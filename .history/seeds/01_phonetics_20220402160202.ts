import { Knex } from "knex";
import { db, closeConnection } from "../dbConnection";
import { createPhonetics } from "../tmSearcher";


export async function seed(knex: Knex): Promise<void> {
    return Promise.resolve().then( async () => {
        const trademarks = await createPhonetics('tm_detail')
        trademarks.forEach(async tm => {
         knex("tm_detail").where('id', tm.id).update({
            'tm_phonetics':JSON.stringify(tm.phonetics)
        })
        
    })
    })
    
};
