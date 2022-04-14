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
export async function fullTmSearch(tmArray:TmInterface[]) {
    const result = tmArray.map(async tm => {
        const keywordPhonetic  = DoubleMetaphone.process(tm.trademark)
        const tms = await db('tm_detail')
        .where('trademark', tm.trademark.toUpperCase())
        .orWhereILike('trademark',`%${tm.trademark}%`)   
        .orWhere('tm_phonetics', keywordPhonetic.join(' '))
        .orWhereLike('tm_phonetics', `%${keywordPhonetic.join(' ')}%`)
        await closeConnection()
        return tms    
    })
    return result
    
}




