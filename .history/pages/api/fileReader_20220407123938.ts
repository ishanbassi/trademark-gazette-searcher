import { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs'
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        const file = fs.createWriteStream('testing.xls')
        req.body.pipe(file)
        
        res.end()
    }
}