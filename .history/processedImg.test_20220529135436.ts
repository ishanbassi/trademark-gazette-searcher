export{}
const replaceColor = require('replace-color')
jest.setTimeout(10000)
test('sd',  async () => {
    await replaceColor({
      image: './captcha.ashx.jpg',
      colors: {
        type: 'hex',
        targetColor: '#d5d5d5',
        replaceColor: '#FFFFFF'
      }
    })
      .then((jimpObject) => {
        jimpObject.write('./output.jpg', (err) => {
          if (err) return console.log(err)
        })
      })
      .catch((err) => {
        console.log(err)
      })
})