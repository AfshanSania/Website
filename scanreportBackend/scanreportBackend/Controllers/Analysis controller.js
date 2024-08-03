import  {imageLink}  from "../Helpers/imagedata.js";
// const jimp = require('jimp');
// const PNG = require('pngjs').PNG;
import { WHO_Grade_I,WHO_Grade_II,WHO_Grade_III,WHO_Grade_IV } from "../Helpers/BrainTumourData.js";
import jimp from "jimp";
import { PNG } from 'pngjs';
import translate from "translate-google-modified"
import pixelmatch from "pixelmatch";
import Tesseract from "tesseract.js";
//import { createWorker } from 'tesseract.js';
// const pixelmatch = require('pixelmatch');
export const analysis=async(req,res)=>{
    try {
const {scanImage,code,type}=req.body
const cd=code?code:"en"
const type1=type?type:"pic"
console.log("cd ",cd);
console.log("type ",type1);
console.log("scanimage",scanImage);
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

const imagetotext= async (imgurl)=>{
    
    Tesseract.recognize(imgurl,"eng",
        { 
          logger: m => console.log(m) 
        }
      )
      .catch (err => {
        console.error(err);
      })
      .then(async(result )=> {
       console.log(result?.data?.text);
       const data1=result.data.text
       const data2=await translate(data1, {to: cd})
       console.log(data2);
       res.status(200).json(data2)
      })
    
}
      

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
         if(compatibility<=25){
            const data=WHO_Grade_I
            const dataz1=await translate(WHO_Grade_I.type, {to: cd})
            const dataz2=await translate(WHO_Grade_I.Curable, {to: cd})
            const dataz3=await translate(WHO_Grade_I.infiltrative, {to: cd})
            const dataz4=await translate(WHO_Grade_I.survival_possibility, {to: cd})
            const dataz5=await translate(WHO_Grade_I.growth, {to: cd})
            const dataz6=await translate(WHO_Grade_I.divisions, {to: cd})
            const data7=await translate(WHO_Grade_I.suggestion, {to: cd})
            data.type=dataz1
            data.Curable=dataz2
            data.infiltrative=dataz3
            data.survival_possibility=dataz4
            data.growth=dataz5
            data.divisions=dataz6
            data.suggestion=data7
            data.compatibility=compatibility
            data.difference=difference
            data.source=imageLink[0]
            data.test=scanImage
            console.log(data);
            // const dataz=await translate("hello", {to: cd})

            //console.log("dataz",dataz);
              res.status(200).json(data)
         }else if(compatibility<=50){
            const data=WHO_Grade_II
            const dataz1=await translate(WHO_Grade_II.type, {to: cd})
            const dataz2=await translate(WHO_Grade_II.Curable, {to: cd})
            const dataz3=await translate(WHO_Grade_II.infiltrative, {to: cd})
            const dataz4=await translate(WHO_Grade_II.survival_possibility, {to: cd})
            const dataz5=await translate(WHO_Grade_II.growth, {to: cd})
            const dataz6=await translate(WHO_Grade_II.divisions, {to: cd})
            const data7=await translate(WHO_Grade_II.suggestion, {to: cd})
            data.type=dataz1
            data.Curable=dataz2
            data.infiltrative=dataz3
            data.survival_possibility=dataz4
            data.growth=dataz5
            data.divisions=dataz6
            data.suggestion=data7
            data.compatibility=compatibility
            data.difference=difference
            data.source=imageLink[0]
            data.test=scanImage
            console.log(data);
            // const dataz=await translate("hello", {to: cd})

            //console.log("dataz",dataz);
              res.status(200).json(data)
         }else if(compatibility<=75){

            const data=WHO_Grade_III 
            const dataz1=await translate(WHO_Grade_III .type, {to: cd})
            const dataz2=await translate(WHO_Grade_III .Curable, {to: cd})
            const dataz3=await translate(WHO_Grade_III .infiltrative, {to: cd})
            const dataz4=await translate(WHO_Grade_III.survival_possibility, {to: cd})
            const dataz5=await translate(WHO_Grade_III .growth, {to: cd})
            const dataz6=await translate(WHO_Grade_III .divisions, {to: cd})
            const data7=await translate(WHO_Grade_III .suggestion, {to: cd})
            data.type=dataz1
            data.Curable=dataz2
            data.infiltrative=dataz3
            data.survival_possibility=dataz4
            data.growth=dataz5
            data.divisions=dataz6
            data.suggestion=data7
            data.compatibility=compatibility
            data.difference=difference
            data.source=imageLink[0]
            data.test=scanImage
            console.log(data);
            // const dataz=await translate("hello", {to: cd})

            //console.log("dataz",dataz);
              res.status(200).json(data)
         }else if(compatibility>=75){


            const data=WHO_Grade_IV
            const dataz1=await translate(WHO_Grade_IV.type, {to: cd})
            const dataz2=await translate(WHO_Grade_IV.Curable, {to: cd})
            const dataz3=await translate(WHO_Grade_IV.infiltrative, {to: cd})
            const dataz4=await translate(WHO_Grade_IV.survival_possibility, {to: cd})
            const dataz5=await translate(WHO_Grade_IV.growth, {to: cd})
            const dataz6=await translate(WHO_Grade_IV.divisions, {to: cd})
            const data7=await translate(WHO_Grade_IV.suggestion, {to: cd})
            data.type=dataz1
            data.Curable=dataz2
            data.infiltrative=dataz3
            data.survival_possibility=dataz4
            data.growth=dataz5
            data.divisions=dataz6
            data.suggestion=data7
            data.compatibility=compatibility
            data.difference=difference
            data.source=imageLink[0]
            data.test=scanImage
            console.log(data);
            // const dataz=await translate("hello", {to: cd})

            //console.log("dataz",dataz);
              res.status(200).json(data)
              
         }else{
            res.status(400).json({"message":"Error"})
         }



        return compatibility;
    } catch (error) {
        console.log(`error comparing images: ${error}`);
        throw error;
    }
};

if(type1=="pic"){
console.log("This is fn")
compareImage(scanImage,imageLink[0])
}
else if(req.body.type=="tx"){
imagetotext(scanImage)
} 
else{
    res.status(400).json("type not found");
}
    } catch (error) {
        
    }
}