import { Knex } from "knex";
import { db } from "../dbConnection";
import { compressImg } from "../utilities/imageCompressor";
import { dataInsert } from "../utilities/tmDataUpdate";

export async function seed(knex: Knex): Promise<void> {
    let {rows} = await db.raw('select application_no, image , trademark  from tm_details where octet_length(image) > 1000000 order by octet_length(image) desc limit 50')
    console.log(rows)
    let a  = await Promise.all(rows.map(async ({image,application_no, trademark}) => {
        let compressBuff  = await compressImg(image)
        return dataInsert(application_no, trademark, compressBuff)
    }))
    
};
