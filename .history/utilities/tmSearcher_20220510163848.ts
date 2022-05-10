import {Metaphone, DoubleMetaphone} from 'natural'
import {db,closeConnection} from '../dbConnection'

export interface TmInterface {
    trademark:string;
    tmClass:string
}
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
export async  function fullTmSearch(tmArray:TmInterface[], table:string) {
    
    const searchResult = await Promise.all(tmArray.map(async tm => {
        const tmPhonetics = Metaphone.process(tm.trademark)
        const wordsList = tm.trademark.split(' ')
        
        const result: any[] = await db(table).select(['page_no', 'details', 'tm_class', 'trademark', 'journal_no', db.raw(`? as regTm`, tm.trademark)])
        .where(function () {
            this.where('trademark', tm.trademark)
            .orWhereILike('trademark', `%${tm.trademark}%`)
            .orWhere('tm_phonetics', tmPhonetics)
            
        })
        .andWhere('tm_class', parseInt(tm.tmClass) | 0)
        
        return result
    }))
    const orderedResult = searchResult.reduce((prevArr, currArr) => prevArr.concat(currArr)).sort((a,b)=> b.journal_no - a.journal_no)
    
    return orderedResult
    
}







