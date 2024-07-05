import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{type:String ,required: true, unique: true},
    userName:{type:String,required: true, unique: true},
    password:{type:String ,required: true},
    isVerified: { type: Boolean, default: false },
},{versionKey:false,timestamps:true})

const USER=mongoose.model('User',userSchema,'User')
export default USER;