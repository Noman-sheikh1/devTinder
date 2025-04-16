const express = require('express');
const connectDB = require("./config/database");
const{validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const User=require("./models/user");
const { userAuth }=require("./middleware/auth")

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup",async(req,res)=>{
    
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

app.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credential");
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(isPasswordValid){ 
      const token=await jwt.sign({_id:user._id},"DEV@Tinder123",{expiresIn:"7d"});
     
      res.cookie("token",token);
      res.send("Login Successfull!!!");
    }else{
      throw new Error("Invalid Credential!");
    }
  }catch(err){
    res.status(400).send("ERROR:"+err.message);
  }
});

app.get("/profile",userAuth,async(req,res)=>{
  try{
    const user=req.user;
  
    res.send(user);
    
  }catch(err){
    res.status(400).send("ERROR:"+err.message);
  }
});
app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user=req.user;
  res.send(user.firstName+"sent the connection request!!");
});



connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });





//mongodb+srv://Noman:<db_password>@mycluster.7ttwa.mongodb.net/?retryWrites=true&w=majority&appName=myCluster