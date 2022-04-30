import type { NextApiRequest, NextApiResponse } from "next";
import { fullTmSearch } from "../../utilities/tmSearcher";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        
        res.send('hi')
    }
}