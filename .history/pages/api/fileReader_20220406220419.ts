import { NextApiRequest, NextApiResponse } from "next";
import  readExcelFile from 'read-excel-file/node'
export default function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        const a = readExcelFile(req)
        console.log(a)
        res.end()
    }
}