const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength:4
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        min:18,
        max:60
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","Female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },

    },
    photoUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ-Y6d_lQB-LawwO8bXkWZZ9aacVFqMwPi5w&s",
    },
    about: {
        type: [String]
    },
    skills:{
        type:[String]
    }
}, 
{
    timestamps:true,
}
);

// Ensure unique index for emailId
//userSchema.index({ emailId: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
