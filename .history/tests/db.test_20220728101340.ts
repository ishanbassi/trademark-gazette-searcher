import { closeConnection, db } from "../dbConnection"
import { promises } from "fs"
export{}

const table = 'tm_details'
test('testing min max functions' , async () => {
    const journals  = await db(table)
    .distinct('journal_no')
    .orderBy('journal_no')
    console.log(journals)
    
})
test('retreiving image from db' , async () => {
    let data = await db(table)
    .select('image')
    .where('application_no',5415189)
    await promises.writeFile('tm.jpg',data[0].image)
    await closeConnection()
    
})