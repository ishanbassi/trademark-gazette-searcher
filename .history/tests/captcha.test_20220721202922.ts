export{}
jest.setTimeout(50000)
import { createWriteStream } from 'fs'
import {getCaptchaImg} from '../utilities/captcha'
test('captcha function', async () => {
    await getCaptchaImg()
})