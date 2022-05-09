import { DoubleMetaphone , Metaphone } from "natural";

test('phonetics' , () => {
    
    const a = Metaphone.process('BEAUVIA')
    const b = Metaphone.process('BFY')
    console.log(a,b)
    
})