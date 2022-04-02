import { Tables } from 'knex/types/tables'
import {db,closeConnection} from './dbConnection'

async function exactMatch(keyword:string, table:string) {
    const tms = await db.select().from(table).where('trademark', keyword.toUpperCase())
    console.log(tms)
}
exactMatch('JAI maa', 'tm_detail')