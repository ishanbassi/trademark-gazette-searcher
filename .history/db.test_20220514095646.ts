import { closeConnection, db } from "./dbConnection"

export{}

const table = 'tm_detail'
test('testing min max functions' , async () => {
    const journals  = await db(table)
    .max('journal_no as journal_no')
    .select(db.raw(`max(journal_no) - min(journal_no) as total`))
    console.log(journals)
    await closeConnection()
})