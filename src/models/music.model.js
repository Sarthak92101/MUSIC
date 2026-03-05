 const mongoose=require('mongoose');

 const musicShema=new mongoose.Schema({
    url:{
      type:String,
      required:true
    },
    title:{
      type:String,
      required:true
    },
    artist:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user',
      required:true
    }

 })

 const musicModel=mongoose.model("music",musicShema);
 module.exports=musicModel;