import { compressImg } from "../utilities/imageCompressor";
test('testing image compression' , async () => {
    await compressImg(['./testAssets/sample.jpg'])
})