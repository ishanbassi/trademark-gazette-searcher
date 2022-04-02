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
    id:number
}
export async function createPhonetics(table:string){
    const trademark:TmInterface[] = await db(table).select('trademark' ,'id')
    await closeConnection()
    const tmPhonetics = trademark.map(tm =>{
        return {
            phonetics:DoubleMetaphone.process(tm.trademark),
            id:tm.id
        }
    })
    return tmPhonetics

}

createPhonetics('tm_detail').then(tms => {
    tms.forEach(async tm => {
        await db('tm_detail').where('id', tm.id)
        .update({'tm_phonetics':tm.phonetics})
        await closeConnection()
    })
}).catch(err => console.log(err))

