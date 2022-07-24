export{}
jest.setTimeout(30000)
import { createWriteStream } from 'fs'
import {solveCaptcha} from '../utilities/captcha'
test('captcha function', async () => {
    console.log(await solveCaptcha())
})