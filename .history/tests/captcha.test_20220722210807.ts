export{}
jest.setTimeout(50000)
import { createWriteStream } from 'fs'
import {solveCaptcha} from '../utilities/captcha'
test('captcha function', async () => {
    await solveCaptcha()
})