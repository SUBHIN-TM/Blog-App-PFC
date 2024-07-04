import USER from "../models/user.js";
import bcrypt from 'bcrypt'

const resetPassword=async(req,res)=>{
try {
    console.log("reset password section");
    console.log(req.body);
    const {email,newPassword}=req.body
    const encryptedPassword=await bcrypt.hash(newPassword,10)
    const response=await USER.findOneAndUpdate({email:email},
       { $set:{password:encryptedPassword}},
       {new:true}
    )
    if (response) {
        res.status(200).json({ message: 'Password updated successfully Redirect To Login Page' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }

} catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: 'Internal server error' });
}
}

export default resetPassword