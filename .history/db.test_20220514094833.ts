import { closeConnection, db } from "./dbConnection"

export{}

const table = 'tm_detail'
test('testing min max functions' , async () => {
    const journals  = await db.raw(`select max(journal_no),ma x(journal_no) - min(journal_no) as total from ?` , [table])
    console.log(journals.rows)
    await closeConnection()
})