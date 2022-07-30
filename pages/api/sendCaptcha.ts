import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../dbConnection";
import { solveCaptcha } from "../../utilities/captcha";
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === "GET") {
        let query = await db('tm_details')
        .select('application_no')
        .where({
            trademark:""
        })
        .limit(1)
        let applNumber = query[0].application_no
        solveCaptcha(applNumber)
    }
}