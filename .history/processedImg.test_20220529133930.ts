export{}
const replaceColor = require('replace-color')
jest.setTimeout(10000)
test('sd', async () => {
  replaceColor({
    image: './input.jpg',
    colors: {
      type: 'hex',
      targetColor: '#FF0000',
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