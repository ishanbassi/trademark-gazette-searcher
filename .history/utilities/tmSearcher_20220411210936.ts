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
    let trademark = 'ishan'
    const result = await db('tm_detail').select(['page_no', 'details', 'tm_class', db.raw(`${trademark} as trademark`), {publishedTm:'trademark'}])
    .where((builder) => {
        tmArray.forEach(tm =>{
            trademark  = tm.trademark
            const tmPhonetics = Metaphone.process(tm.trademark)
            const wordsList = tm.trademark.split(' ')
            builder.where('trademark', tm.trademark)
            .orWhereILike('trademark', `%${tm}%`)
            .orWhereIn('trademark' , wordsList)
            .orWhere('tm_phonetics', tmPhonetics)
            .orWhereLike('tm_phonetics', `%${tmPhonetics}%`)
            .insert
            
        })  
    })    
    await closeConnection()
    return result
    
}







