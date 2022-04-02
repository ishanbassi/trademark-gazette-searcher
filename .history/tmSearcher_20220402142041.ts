import {Metaphone, DoubleMetaphone} from 'natural'
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

interface TmInterface {
    trademark:string
}
export async function createPhonetics(table:string){
    const trademark:TmInterface[] = await db(table).select('trademark')
    await closeConnection()
    const tmPhonetics = trademark.map(tm => DoubleMetaphone.process(tm.trademark))
    return tmPhonetics

}

