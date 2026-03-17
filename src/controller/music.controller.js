const musicModel=require('../models/music.model'); 
const {uploadFile}=require('../services/storage.service');  
const albumModel=require('../models/album.model');          
const jwt=require('jsonwebtoken');


async function createMusic (req,res){
const {title}=req.body;
const file=req.file; 

if(!file){
  return res.status(400).json({
    message:"Music file is required"
  })
}

if(!title){
  return res.status(400).json({
    message:"Title is required"
  })
}

const result=await uploadFile(file.buffer.toString('base64'));
const music=await musicModel.create({
  url:result.url,
  title,
  artist:req.user.id
})
res.status(201).json({
  message:"Music created successfully",
  music:{
    id:music._id,
    url:music.url,
    title:music.title,
    artist:music.artist
  }
}) 



}

async function createAlbum(req,res){

 
const {title,musicIds}=req.body;
const album=await albumModel.create({
  title,
  artist:req.user.id,
  musics:musicIds
})
res.status(201).json({
  message:"Album created successfully",
  album:{
    id:album._id,
    title:album.title,
    artist:album.artist     
  }             
})

}


async function getAllMusics(req,res){
  const musics=await musicModel.find().populate('artist','username email');
  res.status(200).json({
    message:"Musics fetched successfully",
    musics
  })
}




module.exports={createMusic,createAlbum,getAllMusics};