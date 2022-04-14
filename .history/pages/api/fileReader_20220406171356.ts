import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    console.log('hi')
    if(req.method === 'POST') {
        console.log(req.body)
        res.end()
    }
}