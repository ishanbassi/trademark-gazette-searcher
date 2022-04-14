import { NextApiRequest, NextApiResponse } from "next";
import { fullTmSearch } from "../../utilities/tmSearcher";

interface TmInterface{
    tmClass:string;
    trademark:string
}
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        console.log(req.body instanceof Array)
        // const tms:TmInterface[] = req.body
        // const result = tms.map(async tm => {
        //     const tmResult = await fullTmSearch(tm.trademark, 'tm_detail')
        //     return {
        //         [tm.trademark]:tmResult
        //     }
        // })
        // res.send(result)
    }
}