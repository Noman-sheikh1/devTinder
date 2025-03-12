const express=require('express');
const app=express();
app.use("/test",(req,res)=>{
    res.send("Hello from the server i am here after nodemon");
});
app.listen(7777,()=>{
    console.log("server is successfully listening on port 3000");
});