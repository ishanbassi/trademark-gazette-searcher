import imageminJpegtran from "imagemin-jpegtran"
import imageminMozjpeg from 'imagemin-mozjpeg'
import { promises } from "fs"
import imagemin from 'imagemin'


export async function compressImg(imgBuffer) {
    
    let compressBuffer  = await imagemin.buffer(imgBuffer, {
        plugins:[imageminJpegtran({
            progressive:true
        })]
    })
    return compressBuffer
}

