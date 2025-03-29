const express = require('express');
const connectDB = require("./config/database");

const app = express();
const User=require("./models/user");
app.post("/signup",async(req,res)=>{
    const user=new User({
        firstName:"Noman",
        lastName:"sheikh",
        emailId:"Sheikhnoman@gmail.com",
        password:"sheikh@123"
    });
 await user.save();
 res.send("User added successfullly!!");
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