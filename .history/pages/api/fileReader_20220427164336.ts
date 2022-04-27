import { NextApiRequest, NextApiResponse } from "next";
import { closeConnection } from "../../dbConnection";
import { fullTmSearch } from "../../utilities/tmSearcher";

export interface TmInterface{
    tmClass:string;
    trademark:string
}
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === "GET") {
        res.send('hi')
    }
    if(req.method === 'POST') {
        console.log('hii from post ')
        const tms:TmInterface[] = JSON.parse(req.body)
        const table = process.env.NODE_ENV == 'production' ? 'tm_details' : 'tm_detail'
        
        const result =  await  fullTmSearch(tms, table)
        
        res.send(result)
    }
}