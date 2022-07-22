import {Metaphone, DoubleMetaphone} from 'natural'
import {db,closeConnection} from '../dbConnection'

export interface TmInterface {
    trademark:string;
    
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
export async  function fullTmSearch(tmArray:string[], table:string, journal:number, tmClass:number) {
    let tmPhonetics  = tmArray.map(tm => Metaphone.process(tm))

    const result: any[] = await db(table).select(['page_no', 'details', 'tm_class', 'trademark', 'journal_no', 'tm_phonetics'])
    .where('tm_class', tmClass)
    .andWhere('journal_no', journal)
    .andWhere(function () {
        this.whereIn('trademark', tmArray)
        // .orWhereLike('trademark', `%${tm.trademark}%`)
        .orWhereIn('tm_phonetics', tmPhonetics)
        
    })
        
    return result

}







