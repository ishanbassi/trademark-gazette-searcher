import { closeConnection, db } from "./dbConnection"

export{}

const table = 'tm_detail'
test('testing min max functions' , async () => {
    const journals  = await db(table)
    .distinct('journal_no')
    .orderBy('journal_no')
    console.log(journals)
    await closeConnection()
})