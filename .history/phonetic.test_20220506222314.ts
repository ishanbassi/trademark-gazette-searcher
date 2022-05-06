import { DoubleMetaphone , Metaphone } from "natural";

test('phonetics' , () => {
    
    const a = Metaphone.process('HYLOK')
    const b = Metaphone.process('HELGA')
    console.log(a,b)
    
})