export{}
jest.setTimeout(50000)
import { createWriteStream, readFileSync } from 'fs'
import {solveCaptcha, sendCaptcha} from '../utilities/captcha'
test('captcha function', async () => {
    let img  = readFileSync('./utilities/captca.jpg')
     console.log(await sendCaptcha(img))
})