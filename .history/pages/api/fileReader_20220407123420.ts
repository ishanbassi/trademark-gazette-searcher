import { NextApiRequest, NextApiResponse } from "next";
import  readExcelFile from 'read-excel-file/node'
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        
        console.log(req.body)
        res.end()
    }
}