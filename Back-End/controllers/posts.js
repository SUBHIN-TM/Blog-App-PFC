import POSTS from "../models/posts.js";

export const ownPosts=async (req,res)=>{
    try {
        console.log("my posts");
        // console.log(req.token);
        const response=await POSTS.find({userRef:req.token.id}).sort({ createdAt: -1 });
        // console.log(response);
        return res.status(200).json({myPosts:response})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const contentPost=async(req,res)=>{
    try {
        console.log("POST CONTENT");
        console.log(req.token);
        console.log(req.body);
        const id=req.token.id
        const{title,content}=req.body
        const post=new POSTS({
            title,
            content,
            userRef:id
        })
        const response=await post.save();
        console.log(response);
        return res.status(201).json({message:'Post Added'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
    }



    export const deletePost=async(req,res)=>{
        try {
            console.log("Delete post");
            console.log(req.params.id);
            const postId=req.params.id
            const response=await POSTS.findOneAndDelete({_id:postId})
            console.log(response);
            if(response){
                return res.status(200).json({message:'Post successfully Deleted'})
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }



    export const editPost=async(req,res)=>{
        try {
            console.log("edit post");
            console.log(req.params.id);
            console.log(req.body);
            const {title,content}=req.body
            const postId=req.params.id
            const response =await POSTS.findOneAndUpdate(
                {_id:postId},
                {$set:{title,content}},
                {new:true}
            )
            console.log(response);
            if(response){
                return res.status(200).json({message:'Post Updated Successfully'})
            }
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }