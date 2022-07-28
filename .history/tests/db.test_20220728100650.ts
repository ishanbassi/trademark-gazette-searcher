import { closeConnection, db } from "../dbConnection"

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
    console.log(data)
    
})