import USER from "../models/user.js";
import bcrypt from 'bcrypt'

const login=async(req,res)=>{
    try {
        console.log("login page");
        console.log(req.body);
        const {email,password}=req.body
    } catch (error) {
        console.error(error);
    }
}

export default login