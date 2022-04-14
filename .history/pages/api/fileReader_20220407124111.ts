import { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs'
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        await fs.promises.writeFile('testing.xls', req.body)

        res.end()
    }
}