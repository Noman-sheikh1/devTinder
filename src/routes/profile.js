const express=require("express");
const profileRouter=express.Router();
const { userAuth }=require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
      const user=req.user;
    
      res.send(user);
      
    }catch(err){
      res.status(400).send("ERROR:"+err.message);
    }
  });
  profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("invalid Edit Request");
        }
        const loggedInUser=req.user;
        console.log(loggedInUser);
        Object.keys(req.body).forEach((keys)=>(loggedInUser[keys]=req.body[keys]));
        console.log(loggedInUser);
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName},your profile updated successfully!!`);
    }catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
  });


  module.exports=profileRouter;