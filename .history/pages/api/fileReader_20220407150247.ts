import { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs'
import xlsx from 'node-xlsx'
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let data = ''
    if(req.method === 'POST') {
        
        req.on('data', chunk =>{
            console.log(chunk)
        })
        res.end()
    }
}