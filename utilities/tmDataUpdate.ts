export {dataInsert}

import { Metaphone } from "natural"
import { db, closeConnection } from "../dbConnection"
const table = process.env.NODE_ENV == "production" ? "tm_details" : "tm_detail"
async function dataInsert(applNumber:number , trademark:string , image:Buffer) {
    let tm_phonetics = Metaphone.process(trademark)
    await db('tm_details')
    .where('application_no', '=', applNumber)
    .update({
        trademark,
        tm_phonetics,
        image
    })

}
