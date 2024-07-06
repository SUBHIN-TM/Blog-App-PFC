import mongoose from "mongoose";

const postSchema=new mongoose.Schema({  //SCHEMA FOR USER POSTS
    title: { type: String, required: true },
    content: { type: String, required: true },
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{versionKey:false,timestamps:true})

const POSTS=mongoose.model('posts',postSchema,'posts')
export default POSTS;