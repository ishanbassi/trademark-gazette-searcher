import { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs'
import xlsx from 'node-xlsx'
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method === 'POST') {
        const file = xlsx.parse('utilities\July hearing.xls')
        file.forEach(i => console.log(i.data))
        res.end
    }
}