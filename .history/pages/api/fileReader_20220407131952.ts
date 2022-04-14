import { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs'
import xlsx from 'node-xlsx'
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        const file = xlsx.parse('file_example_XLS_10.xls')
        
        res.json(file)
    }
}