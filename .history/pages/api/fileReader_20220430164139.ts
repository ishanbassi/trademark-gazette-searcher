import type { NextApiRequest, NextApiResponse } from "next";
import { fullTmSearch , exactMatch, TmInterface} from "../../utilities/tmSearcher";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        
        const tms:TmInterface[] = JSON.parse(req.body)
        
        
        const result =  await  exactMatch('jai maa', 'tm_details')
        
        res.send(result)
    }
}