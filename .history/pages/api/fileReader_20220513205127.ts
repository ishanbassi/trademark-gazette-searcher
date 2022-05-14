
import knex from "knex";
import type { NextApiRequest, NextApiResponse } from "next";
import { closeConnection, db } from "../../dbConnection";
import { fullTmSearch , exactMatch, TmInterface} from "../../utilities/tmSearcher";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const table = process.env.NODE_ENV == 'production' ? 'tm_details' : 'tm_detail'
    if(req.method === 'GET') {
        const journals  = await db(table)
        .max('journal_no')
        db.raw('max(journal_no) - min(journal_no) as total_journals from ?', table)
        await closeConnection()
        res.send(journals)
    }
    if(req.method === 'POST') {
        
        const tms:TmInterface[] = JSON.parse(req.body)
        const query = req.query
        console.log(query)
        
        const result =  await  fullTmSearch(tms, table)
        
        res.send(result)
    }
}