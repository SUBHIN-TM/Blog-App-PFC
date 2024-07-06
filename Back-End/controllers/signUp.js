import USER from "../models/user.js";
import bcrypt from 'bcrypt'

const signUp= async(req,res)=>{
    try {
        console.log("signUp Page");
        // console.log(req.body.userData);
        const{email,password,userName}=req.body.userData
        const isMailExist=await USER.findOne({email})
        const isUserNameExist=await USER.findOne({userName})
        if(isMailExist){
            return res.status(409).json({isMailExist:true})
        }else if(isUserNameExist){
            return res.status(409).json({isUserNameExist:true})
        }else{
         const encryptedPassword=await bcrypt.hash(password,10)
         const userDetails=new USER({
            email,
            userName,
            password:encryptedPassword
         })
         const response=await userDetails.save();
        //  console.log(response);
         return res.status(201).json({ message: 'User registered successfully', user: response });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export default signUp