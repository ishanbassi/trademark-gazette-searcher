import { NextApiRequest, NextApiResponse } from "next";
import { closeConnection } from "../../dbConnection";
import { fullTmSearch } from "../../utilities/tmSearcher";

interface TmInterface{
    tmClass:string;
    trademark:string
}
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        
        const tms:TmInterface[] = JSON.parse(req.body)
        const result = tms.map(async tm => {
            const tmResult = await fullTmSearch(tm.trademark, 'tm_detail')
            
            return {
                [tm.trademark]:tmResult
            }
        })
        res.send(result)
    }
}