import {Metaphone, DoubleMetaphone} from 'natural'
import {db,closeConnection} from '../dbConnection'
import { TmInterface } from '../pages/api/fileReader'
export async function exactMatch(keyword, table) {
    const tms = await db(table).where('trademark', keyword.toUpperCase())
    await closeConnection()
    return tms
    
}

export async function containsWord(keyword, table) {
    const tms = await db(table)
    .whereILike('trademark',`%${keyword}%`)   
    await closeConnection()
    return tms
}

export async function phoneticSearch(keyword, table) {
    const keywordPhonetic  = DoubleMetaphone.process(keyword)
    const tms = await db(table)
    .where('tm_phonetics', keywordPhonetic.join(' '))
    .orWhereLike('tm_phonetics', `%${keywordPhonetic.join(' ')}%`)
    await closeConnection()
    return tms
}

// a function to perform exact match, phonetic search and containWords search
export async  function fullTmSearch(tmArray:TmInterface[]) {
    const tmPhonetics:any[] = []
    const trademark:string[] = []
    tmArray.forEach(tm => {
        tmPhonetics.push(DoubleMetaphone.process(tm.trademark).join(" "))

    })
    
    const tms = await db('tm_detail')
    .whereRaw('trademark  ~* ? ',['MAA' , 'h'] )
    // .orWhereILike('trademark',`%${tm.trademark}%`)   
    // .orWhereIn('tm_phonetics', keywordPhonetic)
    // .orWhereLike('tm_phonetics', `%${keywordPhonetic.join(' ')}%`)
    
    await closeConnection()
    return tms    
    
}







