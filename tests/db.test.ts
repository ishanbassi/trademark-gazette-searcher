import { closeConnection, db } from "../dbConnection"
import { promises } from "fs"
import { compressImg } from "../utilities/imageCompressor"
import { dataInsert } from "../utilities/tmDataUpdate"
jest.setTimeout(100000)
export{}

const table = 'tm_details'
test('testing min max functions' , async () => {
    const journals  = await db(table)
    .distinct('journal_no')
    .orderBy('journal_no')
    console.log(journals)
    
})
test('retreiving image from db' , async () => {
    let {rows} = await db.raw('select application_no, image , trademark  from tm_details where octet_length(image) < 100000 order by octet_length(image) desc limit 1')
    
    let compressBuff  = await compressImg(rows[0].image , rows[0].application_no)
    
    await dataInsert(rows[0].application_no, rows[0].trademark, rows[0].image)
    await closeConnection()
    
})