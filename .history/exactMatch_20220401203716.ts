import { Tables } from 'knex/types/tables'
import {db,closeConnection} from './dbConnection'

async function exactMatch(keyword:string, table:string) {
    const tms = await db.select().from(table).where('trademark', keyword.toUpperCase())
    await closeConnection()

}
exactMatch('maa', 'tm_detail')