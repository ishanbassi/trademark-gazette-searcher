import { DoubleMetaphone , Metaphone , JaroWinklerDistance } from "natural";
import { UnexpectedResponseException } from "pdfjs-dist";

test('phonetics' , () => {
    
    const a = DoubleMetaphone.process("dixon world")
    const b = DoubleMetaphone.process("dick sonx")
    
    console.log(a,b)
    
})