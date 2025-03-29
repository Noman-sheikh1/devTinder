const mongoose=require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://Noman:maansheikh%40123@mycluster.7ttwa.mongodb.net/devTinder");

};
module.exports=connectDB;