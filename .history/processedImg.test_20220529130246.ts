import Jimp from 'jimp';

Jimp.read('./captcha.ashx.jpg').then(image => {
    image.color([
        { apply: 'blue', params: [255] }
    ]);
  image.write('transparent.png');
});