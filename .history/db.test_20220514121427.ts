import { closeConnection, db } from "./dbConnection"

export{}

const table = 'tm_detail'
test('testing min max functions' , async () => {
    const journals  = await db(table)
    .select('journal_no')
    console.log(journals)
    await closeConnection()
})