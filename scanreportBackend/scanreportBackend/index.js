const jimp = require('jimp');
const PNG = require('pngjs').PNG;

const pixelmatch = require('pixelmatch');

const urlToBuffer = async (url) => {
    return new Promise(async (resolve, reject) => {
        await jimp.read(url, async (err, image) => {
            if (err) {
                console.log(`error reading image in jimp: ${err}`);
                reject(err);
            }
            image.resize(400, 400);
            return image.getBuffer(jimp.MIME_PNG, (err, buffer) => {
                if (err) {
                    console.log(`error converting image url to buffer: ${err}`);
                    reject(err);
                }
                resolve(buffer);
            });
        });
    });
};

const compareImage = async (
    twitterProfilePicURL,
    assetCDNURL
) => {
    try {
        console.log('> Started comparing two images');
        const img1Buffer = await urlToBuffer(twitterProfilePicURL);
        const img2Buffer = await urlToBuffer(assetCDNURL);
        const img1 = PNG.sync.read(img1Buffer);
        const img2 = PNG.sync.read(img2Buffer);
        const { width, height } = img1;
        const diff = new PNG({ width, height });

        const difference = pixelmatch(
            img1.data,
            img2.data,
            diff.data,
            width,
            height,
            {
                threshold: 0.1,
            }
        );

        const compatibility = 100 - (difference * 100) / (width * height);
        console.log(`${difference} pixels differences`);
        console.log(`Compatibility: ${compatibility}%`);
        console.log('< Completed comparing two images');
        return compatibility;
    } catch (error) {
        console.log(`error comparing images: ${error}`);
        throw error;
    }
};


compareImage('https://tse4.mm.bing.net/th?id=OIP.JY2wocOWt4e3mbWXog9bmwHaG8&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.cyLqM6XHoO9t8_bRK2t5PAHaGW&pid=Api&P=0&h=180'
)                                                                                                                                                                                                                                                                                                                                                   