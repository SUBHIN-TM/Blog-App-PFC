import USER from "../models/user.js";
import { otpSend } from "../util/otpSending.js";

export const sendOtp=async(req,res)=>{ //CONTROLLER FOR SENDING OTP WITH HELP OF NODEMAILER UTIL
    try {
        console.log("OTP Sending Section");
        // console.log(req.body);
        const {email,otp}=req.body
        
        const isRegisteredEmail=await USER.findOne({email})
        // console.log(isRegisteredEmail);
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
        return res.status(500).json({ message: 'Server error' });
    }
}



export const otpVerified=async(req,res)=>{  //IF USER OTP VERIFIED NEED TO MARK AS VERIFID IN DATABASE
    try {
        console.log("OTP Verified Section");
        console.log(req.body);
        const email=req.body.email
        const response=await USER.findOneAndUpdate({email:email},
            { $set:{isVerified:true}},
            {new:true}
         )
         if(response){
            console.log("verfied and marked in db");
            return res.status(200).json({verified:true})
         }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });  
    }
}