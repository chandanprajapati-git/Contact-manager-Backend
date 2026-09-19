const asyncHandler=require("express-async-handler");
const User=require("../Models/userModel")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async (req,res)=>{
  const {username,email,password}=req.body;
  if(!username||!email||!password){
    res.status(400);
    throw new Error("All Fields are mandatory")
  }
  const userAvailable=await User.findOne({email});
  if(userAvailable){
    res.status(400);
    throw new Error("User already registered")
  }
  const hashedPassword = await bcrypt.hash(password,10)
  console.log("hashed password:",hashedPassword); 
  const user=await User.create({
    username,
    email,
    password:hashedPassword,
  })
  console.log(`User created ${user}`);
  if(user){
    res.status(201).json({_id:user.id,email:user.email});
  }else{
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({message:"Register the user"})
})


const loginUser = asyncHandler(async (req,res)=>{
  const {email,password}=req.body;
  if(!email|| !password){
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({email});

  if(user && (await bcrypt.compare(password,user.password))){
    const accessToken= jwt.signin({
      user:{
        username:user.username,
        email:user.email,
        id:user.id,
      },
    },process.env.ACCESS_TOKEN_SECRET,
  {expiresIn:"1m"})
    res.status(200).json({accessToken});
  }else{
    res.status(401);
    throw new Error("Email or Password is not Valid")
  }
  res.json({message:"login User"}) 
})


const currentUser = asyncHandler(async (req,res)=>{
  res.json({message:"Current  user Information"})
})

module.exports={registerUser,currentUser,loginUser};