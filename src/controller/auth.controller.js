const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  })
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User already exist"
    })
  }
  const hash=await bcrypt.hash(password,10); 

  const user=await userModel.create({
    username,
    email,
    password,
    role
  })
  const token =jwt.sign({
    id:user._id,
    role:user.role
  },process.env.JWT_SECRET_KEY)
  res.cookie('token',token)
  res.status(201).json({
    message:"User created successfully",
    user:{
      username:user.username,
      email:user.email,
      role:user.role
    }
  })

}





module.export = { registerUser }