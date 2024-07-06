import USER from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()


const login=async(req,res)=>{
    try {
        console.log("login page");
        // console.log(req.body);
        const {email,password}=req.body
        const user=await USER.findOne({email})
        if(user){ //IF THE MAIL REGISTERED IT WILL CHECK THE PASSWORD
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){ //PASSWORD MISS MATCH ERROR
            return res.status(400).json({message:'Password Mismatch'})
        }else if(!user.isVerified){//IF USER REGISTERED BUT NOT VERIFIED EMAIL OTP
          return res.status(401).json({message:'Email Not Verified Redirect to Verification Page'})
        }
        else{ //IF THE USER IS GENUINE
            const payload={id:user._id,email:user.email,userName:user.userName,isVerified:user.isVerified}
            // console.log(payload);
            let key = process.env.JWT_KEY
            let token = jwt.sign(payload, key)
            // console.log(token);
            return res.status(200).json({message:'Succesfully Logined',token})
        }
        }else{
            return res.status(404).json({message:'Invalid Email Id'})
        }
    } catch (error) {      
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export default login