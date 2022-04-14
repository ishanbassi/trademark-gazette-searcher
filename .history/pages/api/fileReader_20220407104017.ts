import { NextApiRequest, NextApiResponse } from "next";
import  readExcelFile from 'read-excel-file/node'
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        
        const excel = readExcelFile('utilities/July hearing.xls').then(row => console.log(row))
        console.log(excel)
        
        
        res.end()
    }
}