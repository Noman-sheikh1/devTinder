const express=require("express");
const authRouter=express.Router();
const{validateSignUpData}=require("../utils/validation");
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

authRouter.post("/signup",async(req,res)=>{

    
    try{
      validateSignUpData(req);
      const {firstName, lastName,emailId,password}=req.body;
      const passwordHash=await bcrypt.hash(password,10);
      const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
  
      });
    
    //const user=new User(req.body);
      
        await user.save();
        res.send("User added successfullly!!");
        
      }catch(err){
        res.status(400).send("Error saving the user:"+err.message);
      }
   
  });
 
  authRouter.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credential");
    }
    const isPasswordValid=await user.validatePassword(password);
    if(isPasswordValid){ 
      const token=await user.getJWT();
     
      res.cookie("token",token);
      res.send("Login Successfull!!!");
    }else{
      throw new Error("Invalid Credential!");
    }
  }catch(err){
    res.status(400).send("ERROR:"+err.message);
  }
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("Logout Successfull!!");
})

module.exports=authRouter;
