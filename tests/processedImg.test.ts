export{}
const replaceColor = require('replace-color')
jest.setTimeout(10000)
test('sd',  async () => {
  const targetColors = ['#262626', '#d5d5d5']
    for(let color of targetColors){
      await replaceColor({
        image: './captcha.ashx.jpg',
        colors: {
          type: 'hex',
          targetColor: color,
          replaceColor: '#FFFFFF'
        }
      })
        .then((jimpObject) => {
          jimpObject.write('./captcha.ashx.jpg', (err) => {
            if (err) return console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
})