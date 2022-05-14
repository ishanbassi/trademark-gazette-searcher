import type { NextApiRequest, NextApiResponse } from "next";
import { fullTmSearch , exactMatch, TmInterface} from "../../utilities/tmSearcher";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        
        const tms:TmInterface[] = JSON.parse(req.body)
        
        const table = process.env.NODE_ENV == 'production' ? 'tm_details' : 'tm_detail'
        const result =  await  fullTmSearch(tms, table)
        
        res.send(result)
    }
}