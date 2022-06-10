import Jimp from 'jimp';
jest.setTimeout(10000)
test('image processing', async () => {
  await Jimp.read('./captcha.ashx.jpg').then(image => {
    image.color([
        { apply: 'blue', params: [255] }
    ]);
  image.write('test.jpg');
});
})