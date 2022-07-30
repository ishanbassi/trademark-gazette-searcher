export{}
jest.setTimeout(30000)
import { createWriteStream } from 'fs'
import {getCaptchaImg} from '../utilities/captcha'
test('captcha function', async () => {
    let writeStream = createWriteStream('./captcha.ashx.jpg')
    let chunk  = await getCaptchaImg()
    writeStream.write(chunk)
})