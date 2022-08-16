import imageminJpegtran from "imagemin-jpegtran"
import imageminMozjpeg from 'imagemin-mozjpeg'
import { promises } from "fs"
import imagemin from 'imagemin'


export async function compressImg(imgBuffer:Buffer) {
    
    let compressBuffer  = imagemin.buffer(imgBuffer, {
        plugins:[imageminJpegtran({
            progressive:true
        })]
    })
    .catch(reason =>{
        if(reason.code == 2) {
            console.log(reason)
            return imgBuffer
        }
        
    })
    return compressBuffer
}

