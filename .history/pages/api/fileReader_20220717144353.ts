

import type { NextApiRequest, NextApiResponse } from "next";
import { closeConnection, db } from "../../dbConnection";
import { fullTmSearch , exactMatch, TmInterface} from "../../utilities/tmSearcher";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const table = 'tm_details'
    
    if(req.method === 'GET') {
        const journals  = await db(table)
        .distinct('journal_no')
        .orderBy('journal_no', 'desc')
        res.send(journals)
        
    }
    if(req.method === 'POST') {
        
        const tms:string[] = JSON.parse(req.body)
        const {journal, tmClass}  = req.query
        console.log(journal , tmClass)
        const result =  await  fullTmSearch(tms, table, parseInt(journal as string), parseInt(tmClass as string))
        
        res.send(result)
    }
}