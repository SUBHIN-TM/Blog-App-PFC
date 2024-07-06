import { Button, TextField, Container, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { URL } from '../constants/links';

const OtpVerification = () => {
    const [email, setEmail] = useState("") //STORE EMAIL,IF AFTER SIGNUP THE MAIL IS ALREADY FILLED
    const [inputOtp, setInputOtp] = useState("") //STORE USER TYPING OTP
    const [generatedOTP, setGeneratedOTP] = useState("") //TO COMPARE THE OTP 
    const [canResendOTP,setCanResendOTP]=useState(true) //RESEND THE OTP ,THIS STATE IS USED 
    const [resendTimer,setResendTimer]=useState(60) //ALLOWED 60 SECONDS TO SUBMIT OTP , AFTER 60 SECONDS USER NEED TO AGAIN RESEND THE OTP
    const[isPageFromForgotPassword,setIsPageFromForgotPassword]=useState(false) //SAME OTP PAGE USED IN LOGIN REGISTRATION AND FORGOT PASSWORD PAGE,SO IT WILL DECIDE THE REST ACTIONS BASED ON WHICH VERIFICATION NEEDED
    const location=useLocation(); //IT IS USED TO FETCH THE OBJECT DATA FROM THE URL THAT REDIRECT FROM SIGN UP PAGE
    const navigate=useNavigate() //NEED TO CHANGE THE ROUTE

    useEffect(() => {
        if (location?.state?.registeredEmail) { //CHECKING THE ROUTE HAS AN EMAIL ID IF EXIST IT WILL AUTO FILL
            setEmail(location.state.registeredEmail)
        }
        if(location?.state?.fromForgotPassword){  //IS CHECKING THE WHETHER THE PAGE REDIRECTED FORM FORGOT PASSWORD PAGE OR SIGN UP REGISTRATION PAGE
            setIsPageFromForgotPassword(true)
        }
      }, [location.state])



    const startResendTimer = () => {  //SETTING TIMER FOR SEND OTP
        setCanResendOTP(false)
        let seconds = 60;
        const interval = setInterval(() => {
          seconds--;
          setResendTimer(seconds);
          if (seconds === 0) {
            clearInterval(interval);
            setCanResendOTP(true); 
          }
        }, 1000);   
      };


    const sendOtp = async () => { //SENDING OTP TO USERS EMAIL ID
        setCanResendOTP(false) //ONCE SEND BUTTON CLICK NOT ALLOW REPEATEDLY 
        try {
          const generateOTP = () => {
            return Math.floor(100000 + Math.random() * 900000);
          }
          const otp = generateOTP()
          setGeneratedOTP(otp)
          const response = await axios.post(`${URL}/sendOtp`,{ otp, email })
          if (response.data.message) {
            startResendTimer() //TIMER WILL ONLY START AFTER OTP SENT FROM SERVER
            toast.success(response.data.message)
          }
    
        } catch (error) {
            setCanResendOTP(true)
            if(error.response){
                const statusCode=error.response.status
                if(statusCode === 404){
                    toast.error(error.response.data.message);
                }
            }
          console.error(error);
        }
      }



      const veriyingOTP=async()=>{ //VERIFYING THE GENERATED OTP AND USER TYPED OTP ARE MATCHING
       if(generatedOTP == inputOtp){
        if(isPageFromForgotPassword){
            toast.success("Email Verified successfully. Redirecting to Password Setting Page...", {
                onClose: () => {
                  navigate('/setNewPassword',{
                    state:{email}
                  })
                }
              })
        }else{
          try {
            const response=await axios.post(`${URL}/Otpverified`,{email})
            if(response.data.verified){
              toast.success("Email Verified successfully. Redirecting to Login Page...", {
                onClose: () => {
                  navigate('/login')
                }
              })
            }
          } catch (error) {
            console.error(error);
            toast.error('An error occurred during Verification. Please try again.')
          }          
        }
       
       }else{
        toast.error('Invalid OTP')
       }
      }


    return (
        <div className='backgroundDiv'>
        <div className='loginDiv flex items-center justify-center h-screen p-2'>
            <Container maxWidth="sm" className='border-2 border-black rounded-lg p-14'>
                <Typography variant="h4" component="h1" gutterBottom align='center'>
                    Email Verification 
                </Typography>
                <form>
                    <TextField label="Registered Email" autoComplete='current-name' type="email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} name='email' value={email} />
                    {(canResendOTP)? ( <Button  onClick={sendOtp} variant="contained" endIcon={<SendIcon />}>   Send </Button>) : ( <Button disabled  onClick={sendOtp} variant="contained" endIcon={<SendIcon />}>   Send </Button>)}
                    <span className='mx-2 font-medium'>{resendTimer} Seconds</span>
                    <TextField autoComplete="current-password" label="OTP" type="number" fullWidth margin="normal" name='otp' onChange={(e) => setInputOtp(e.target.value)} value={inputOtp} />
                    {(canResendOTP)?( <Button disabled style={{ marginTop: '10px' }} variant="contained" color="primary" fullWidth className='mt-3'> Verify </Button>):( <Button onClick={veriyingOTP}  style={{ marginTop: '10px' }} variant="contained" color="primary" fullWidth className='mt-3'> Verify </Button>)}
                   
                </form>
            </Container>
            <ToastContainer />
        </div>
        </div>
    );
};

export default OtpVerification;
