import { DoubleMetaphone } from "natural";

test('phonetics' , () => {
    
    const a = DoubleMetaphone.process('kair').join(' ')
    const b = DoubleMetaphone.process('nasa care life').join(' ')
    console.log(a,b)
    
})