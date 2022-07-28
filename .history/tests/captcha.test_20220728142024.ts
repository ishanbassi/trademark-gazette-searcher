export{}
jest.setTimeout(100000)
import { createWriteStream, readFileSync } from 'fs'
import {solveCaptcha, sendCaptcha} from '../utilities/captcha'
test('captcha function', async () => {
    await solveCaptcha('4282892')
})