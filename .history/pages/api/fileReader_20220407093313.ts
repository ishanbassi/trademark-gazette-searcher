import { NextApiRequest, NextApiResponse } from "next";
import  readExcelFile from 'read-excel-file/node'
export default function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        const uInt = new Uint8Array(req.body)
        console.log(uInt)
        
        res.end()
    }
}