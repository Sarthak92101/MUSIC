const musicModel=require('../models/music.model'); 



async function createMusic (req,res){
const token=req.cookies.token;
if(!token){
  return res.status(401).json({
    message:"Unauthorized"
  })
}


try{
const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
if(decoded.role!=='artist'){
  return res.status(403).json({
    message:"You don't have permission to create music"
  })
}


 
}catch(err){
return res.status(401).json({
  message:"Unauthorized"
})
}


const {title}=req.body;
const file=req.file; 



}


module.exports={createMusic}