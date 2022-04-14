import {writeToStream} from 'fast-csv'
import *  as fs from 'fs'
import {db, closeConnection} from '../dbConnection'
const  fileStream = fs.createWriteStream('trademark.csv')


async function testing() {
    const tms = await db('tm_detail')
    await closeConnection()
    writeToStream(fileStream, tms)
}
testing()