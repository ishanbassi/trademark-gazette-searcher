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
export async  function fullTmSearch(tmArray:TmInterface[], table) {
    
    const searchResult = await Promise.all(tmArray.map(async tm => {
        const tmPhonetics = Metaphone.process(tm.trademark)
        const wordsList = tm.trademark.split(' ')
        
        const result = db(table).select(['page_no', 'details', 'tm_class', 'trademark', db.raw(`? as regTm`, tm.trademark)])
        .where('trademark', tm.trademark)
        .orWhereILike('trademark', `%${tm}%`)
        
        .orWhere('tm_phonetics', tmPhonetics)

        
        return result
    }))
    
    return searchResult.reduce((prevArr, currArr) => prevArr.concat(currArr))
    
}







