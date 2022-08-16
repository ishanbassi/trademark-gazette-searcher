

import type { NextApiRequest, NextApiResponse } from "next";
import { closeConnection, db } from "../../dbConnection";
import { fullTmSearch , exactMatch, TmInterface} from "../../utilities/tmSearcher";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    const {journal}  = req.query
    
    let data = await db('tm_details')
    .select(['trademark', 'journal_no', 'tm_class', 'application_no'])
    .where('journal_no', parseInt(journal as string))
    .orderBy('tm_class', "asc")
    
    res.send(data)
}
export const config = {
    api: {
      responseLimit: false,
    },
  }
  