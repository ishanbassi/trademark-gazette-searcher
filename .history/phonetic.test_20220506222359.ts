import { DoubleMetaphone , Metaphone } from "natural";

test('phonetics' , () => {
    
    const a = Metaphone.process('TELKUS')
    const b = Metaphone.process('DOLEXIA')
    console.log(a,b)
    
})