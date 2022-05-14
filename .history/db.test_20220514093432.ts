import { closeConnection, db } from "./dbConnection"

export{}


test('testing min max functions' , async () => {
    const journals  = await db.raw('select max(journal_no),max(journal_no) - min(journal_no) as total from ?' ,'tm_detail')
    console.log(journals.rows)
    await closeConnection()
})