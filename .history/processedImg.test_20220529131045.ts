import Jimp from 'jimp';
jest.setTimeout(10000)
test('image processing' ,async () => {
  await Jimp.read('./captcha.ashx.jpg').then(image => {
    const targetColor = {r: 155, g: 155, b: 155, a:1};  // Color you want to replace
    const replaceColor = {r: 255, g: 255, b: 255, a: 1};  // Color you want to replace with
    const colorDistance = (c1, c2) => Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2) + Math.pow(c1.a - c2.a, 2));  // Distance between two colors
    const threshold = 32;  // Replace colors under this threshold. The smaller the number, the more specific it is.
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      const thisColor = {
        r: image.bitmap.data[idx + 0],
        g: image.bitmap.data[idx + 1],
        b: image.bitmap.data[idx + 2],
        a: image.bitmap.data[idx + 3]
      };
      if(colorDistance(targetColor, thisColor) <= threshold) {
        image.bitmap.data[idx + 0] = replaceColor.r;
        image.bitmap.data[idx + 1] = replaceColor.g;
        image.bitmap.data[idx + 2] = replaceColor.b;
        image.bitmap.data[idx + 3] = replaceColor.a;
      }
    });
    image.write('test.jpg');
  });
})