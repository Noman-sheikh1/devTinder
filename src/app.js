const express = require('express');
const connectDB = require("./config/database");
const{validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");

const app = express();
app.use(express.json());
const User=require("./models/user");
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
app.get("/user",async(req,res)=>{
    const userEmail= req.body.emailId;
    try{
      const users=await User.findOne({emailId:userEmail});
      res.send(users);
      // if(users.length==0){
      //   res.status(404).send("User not found");
      // }else{
      //   res.send(users);
      // }

    }
    catch(err){
      res.status(400).send("something went wrong!!");
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
      res.send("Login Successfull!!!");
    }else{
      throw new Error("Invalid Credential!");
    }
  }catch(err){
    res.status(400).send("ERROR:"+err.message);
  }
});

//feed APi used to get all user information 
app.get("/feed",async(req,res)=>{
  
  try{
    const users=await User.find({});
      res.send(users);
  }
  catch(err){
    res.status(400).send("something went wrong!!");
  }
});
//delete api
app.delete("/user",async(req,res)=>{
   const userId=req.body.userId;
   try{
    const user=await User.findByIdAndDelete({_id:userId});
    res.send("User delete successfully:");
   }
   catch(err){
    res.status(400).send("Something went wrong:");
   }
});
//update an api
app.patch("/user/:userId",async(req,res)=>{
  const userId=req.params?.userId;
  const data=req.body;
  try{
    const ALLOWED_UPDATE=["photoUrl","about","gender","age","skills"];
    const isUpdateAllowed=Object.keys(data).every((k)=>
      ALLOWED_UPDATE.includes(k)
    );
    if(!isUpdateAllowed){
      throw new Error("Update not allowed");
    }
    if(data?.skills.length>10){
      throw new Error("skills can't be more than 10");
    }
   const user=await User.findByIdAndUpdate({_id:userId},data,{
    returnDocument:"after",
     runValidators:true,
   });
   res.send("User updated successfully:");
   }
  catch(err){
   res.status(400).send("Something went wrong:"+err.message);
  }
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