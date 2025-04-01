const express = require('express');
const connectDB = require("./config/database");

const app = express();
app.use(express.json());
const User=require("./models/user");
app.post("/signup",async(req,res)=>{
    const user=new User(req.body);
    try{
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
app.patch("/user",async(req,res)=>{
  const userId=req.body.userId;
  const data=req.body;
  try{
   const user=await User.findByIdAndUpdate({_id:userId},data);
   res.send("User updated successfully:");
  }
  catch(err){
   res.status(400).send("Something went wrong:");
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