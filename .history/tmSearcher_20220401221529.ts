import { Tables } from 'knex/types/tables'
import {db,closeConnection} from './dbConnection'


async function exactMatch(keyword, table) {
    const tms = await db.select().from(table).where('trademark', keyword.toUpperCase())
    await closeConnection()
    
}

async function containsWord(keyword, table) {
    const tms = await db.select().from(table)
    .whereILike('trademark',`%${keyword}%`)   
    .orWhereILike('trademark', `_${keyword}_`)
    .orWhereILike('trademark', `_${keyword}%`)
    .orWhereILike('trademark', `%${keyword}_`)
    await closeConnection()
    console.log(tms)
}
containsWord('life', 'tm_detail')