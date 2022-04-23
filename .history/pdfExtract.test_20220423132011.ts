import {promises as fsPromise} from 'fs'
import path from 'path'
import { pdfIterator } from './seeds/02_more_data'

import { extractPdfText } from './utilities/textExtraction'
test('testing pdf extract' , async () => {
    // const result  = await extractPdfText('./pdfs/journal 2045/document4.pdf')
    // await fsPromise.writeFile('pdf1.json', JSON.stringify(result), {encoding:'utf-8'})
    const myAsyncIterable = {
        async* [Symbol.asyncIterator]() {
            yield "hello";
            yield "async";
            yield "iteration!";
        }
    }
    for await(let a of myAsyncIterable){
        console.log(a)
    }
})