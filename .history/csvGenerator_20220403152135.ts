import {format} from 'fast-csv'

const stream  = format({headers:true})
stream.pipe(process.stdout)
stream.write({
    trademark:'testing',
    details:'sdfsdf',
    tm_class:23
})

