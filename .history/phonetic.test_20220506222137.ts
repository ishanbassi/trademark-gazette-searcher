import { DoubleMetaphone , Metaphone } from "natural";

test('phonetics' , () => {
    
    const a = DoubleMetaphone.process('HYLOK').join(' ')
    const b = DoubleMetaphone.process('HELGA').join(' ')
    console.log(a,b)
    
})