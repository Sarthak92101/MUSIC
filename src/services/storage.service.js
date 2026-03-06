const {ImageKit}=require("@imagekit/nodejs")

const imageKitClient=new ImageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})

async function uploadFile(file){
  const result=await imageKitClient.upload({
    file,
    fileName:"music_" + Date.now(),
    folder:"SPOTIFY/music"
  })
  return result;
} 

module.exports={
  uploadFile
}        