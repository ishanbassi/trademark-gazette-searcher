import { db } from "./dbConnection"

export{}


test('testing min max functions' , async () => {
    const journals  = await db.raw('select min(journal_no) from tm_detail')
    console.log(journals)
})