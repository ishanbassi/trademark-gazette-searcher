import {db,closeConnection} from './dbConnection'

async function exactMatch(keyword, table) {
    const tms = await db.select().from(table).where('trademark', keyword)
    console.log(tms)
}
exactMatch('JAI maa', 'tm_detail')