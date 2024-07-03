import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{type:String},
    userName:{type:String},
    password:{type:String},
    isVerified: { type: Boolean, default: false },
    otp:{type:Number}
},{versionKey:false,timestamps:true})

const USER=mongoose.model('User',userSchema,'User')
export default USER;