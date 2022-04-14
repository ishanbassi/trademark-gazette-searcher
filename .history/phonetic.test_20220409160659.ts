import { DoubleMetaphone } from "natural";

test('phonetics' , () => {
    console.log(DoubleMetaphone.process('kair'))
    console.log(DoubleMetaphone.process('nasa care life'))
})