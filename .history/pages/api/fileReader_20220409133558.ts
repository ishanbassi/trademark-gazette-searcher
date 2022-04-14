import { NextApiRequest, NextApiResponse } from "next";
import { closeConnection } from "../../dbConnection";
import { fullTmSearch } from "../../utilities/tmSearcher";

export interface TmInterface{
    tmClass:string;
    trademark:string
}
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        
        const tms:TmInterface[] = JSON.parse(req.body)
        
        const result =  await  fullTmSearch(tms)
        console.log(result)
        res.send(result)
    }
}