import imagemin from 'imagemin'
import imageinJpegtran from 'imagemin-jpegtran'
export async function compressImg(path) {
    let file = await imagemin(path, {
       destination:"./testAssets/" ,
       plugins:[imageinJpegtran()]
    })
    console.log(file)
}

compressImg(['./testAssets/sample.jpg'])