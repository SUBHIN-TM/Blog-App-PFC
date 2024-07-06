import POSTS from "../models/posts.js";

const home=async(req,res)=>{
    console.log("Home page");
    try {
        const response=await POSTS.find({}) .populate('userRef', 'userName email').sort({ createdAt: -1 });
        // console.log(response);
        if(response){
            return res.status(200).json({allPosts:response})
        }     
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }

}

export default home