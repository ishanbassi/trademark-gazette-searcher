export{}
jest.setTimeout(20000)
import { createWriteStream } from 'fs'
import {getCaptchaImg} from '../utilities/captcha'
test('captcha function', async () => {
    let writeStream = createWriteStream('./captcha.ashx.jpg')
    writeStream.write(await getCaptchaImg())
})