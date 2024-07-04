import USER from "../models/user.js";

export const sendOtp=async(req,res)=>{
    try {
        console.log("OTP Sending Section");
        console.log(req.body);
        const email=req.body.email
        const isRegisteredEmail=await USER.findOne({email})
        console.log(isRegisteredEmail);
        if(!isRegisteredEmail){
            return res.status(404).json({ message: 'Email not registered' });
        }else{
            return res.status(200).json({ message: 'OTP Has been sent to your Email ID' });
        }
    } catch (error) {
        console.error(error);
    }
}