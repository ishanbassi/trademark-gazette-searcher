export{}
const replaceColor = require('replace-color')
jest.setTimeout(10000)
test('sd',  async () => {
  const targetColors = ['#262626', '#d5d5d5', '#0d0d0d','#606060','#737373','#6e6e6e']
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