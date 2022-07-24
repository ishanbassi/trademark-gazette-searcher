export{}
jest.setTimeout(50000)
import { createWriteStream, readFileSync } from 'fs'
import {solveCaptcha, sendCaptcha} from '../utilities/captcha'
test('captcha function', async () => {
    await solveCaptcha()
})