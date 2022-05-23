

import type { NextApiRequest, NextApiResponse } from "next";
import { closeConnection, db } from "../../dbConnection";
import { fullTmSearch , exactMatch, TmInterface} from "../../utilities/tmSearcher";
const table = "tm_details"
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
 
    if(req.method === 'GET') {
        const journals  = await db(table)
        .distinct('journal_no')
        .orderBy('journal_no', 'desc')
        res.send(journals)
        
    }
    if(req.method === 'POST') {
        
        const tms:TmInterface[] = JSON.parse(req.body)
        const {journal}  = req.query
        
        const result =  await  fullTmSearch(tms, table, parseInt(journal as string))
        
        res.send(result)
    }
}