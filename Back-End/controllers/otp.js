import USER from "../models/user.js";
import { otpSend } from "../util/otpSending.js";

export const sendOtp=async(req,res)=>{
    try {
        console.log("OTP Sending Section");
        console.log(req.body);
        const {email,otp}=req.body
        
        const isRegisteredEmail=await USER.findOne({email})
        console.log(isRegisteredEmail);
        if(!isRegisteredEmail){
            return res.status(404).json({ message: 'Email not registered' });
        }else{
            let response=await otpSend(email,otp)
            console.log(response);
            if(response.mailSend){
                return res.status(200).json({ message: 'OTP Has been sent to your Email ID' });
            }
          
        }
    } catch (error) {
        console.error(error);
    }
}