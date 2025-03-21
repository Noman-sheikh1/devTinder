const express = require('express');
const app = express();
const {adminAuth,userAuth}=require("./middleware/auth");

app.use("/admin",adminAuth);
app.use("/user/login",(req,res)=>{
    res.send("Login successfully!..");
});
app.use("/user",userAuth,(req,res)=>{
    res.send("User data sent");
});

app.use("/admin/getAllData",(req,res)=>{
    res.send("All Data sent");
});
app.use("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a user");
});


app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777");
});

