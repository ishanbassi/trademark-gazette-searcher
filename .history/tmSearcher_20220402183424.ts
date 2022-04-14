import {Metaphone, DoubleMetaphone} from 'natural'
import {db,closeConnection} from './dbConnection'


export async function exactMatch(keyword, table) {
    const tms = await db.select().from(table).where('trademark', keyword.toUpperCase())
    await closeConnection()
    
}

export async function containsWord(keyword, table) {
    const tms = await db.select().from(table)
    .whereILike('trademark',`%${keyword}%`)   
    await closeConnection()
    console.log(tms)
}

export async function phoneticSearch(keyword, table) {
    const tms = await db.select().from(table).where('tm_phonetics' , ` [ 'JM', 'AM' ]`)
    await closeConnection()
    console.log(tms)
}
phoneticSearch('k','tm_detail')