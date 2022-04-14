import { NextApiRequest, NextApiResponse } from "next";
import  readExcelFile from 'read-excel-file/node'
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        
        const excel = readExcelFile('file_example_XLS_10.xls')
        console.log(excel)
        
        
        res.end()
    }
}