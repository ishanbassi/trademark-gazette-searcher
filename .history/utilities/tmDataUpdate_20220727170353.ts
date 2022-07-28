export {dataInsert}

import { Metaphone } from "natural"
import knex, { Knex } from "knex";
const table = process.env.NODE_ENV == "production" ? "tm_details" : "tm_detail"
async function dataInsert(applNumber , trademark , image) {
    let tm_phonetics = Metaphone.process(trademark)
    await knex(table)
    .where('application_no', '=', applNumber)
    .update({
        trademark,
        tm_phonetics,
        image
    })
}