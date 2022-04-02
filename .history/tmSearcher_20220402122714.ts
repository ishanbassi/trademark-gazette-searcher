import { doubleMetaphone } from 'double-metaphone'
import {db,closeConnection} from './dbConnection'


async function exactMatch(keyword, table) {
    const tms = await db.select().from(table).where('trademark', keyword.toUpperCase())
    await closeConnection()
    
}

async function containsWord(keyword, table) {
    const tms = await db.select().from(table)
    .whereILike('trademark',`%${keyword}%`)   
    await closeConnection()
    console.log(tms)
}


async function phoneticSearch(keyword, table){}
console.log(doubleMetaphone('know'))