import { Button, TextField, Container, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { URL } from '../constants/links';

const OtpVerification = () => {
    const [email, setEmail] = useState("")
    const [inputOtp, setInputOtp] = useState("")
    const [emailError, setEmailError] = useState("")
    const [otpError, setOtpError] = useState("")

    const [generatedOTP, setGeneratedOTP] = useState("")
    const [canResendOTP,setCanResendOTP]=useState(true)
    const [resendTimer,setResendTimer]=useState(60)

    const location=useLocation(); //IT IS USED TO FETCH THE OBJECT DATA FROM THE URL THAT REDIRECT FROM SIGN UP PAGE

    useEffect(() => {
        if (location?.state?.registeredEmail) { //TAKING THE TICKET ID NUMBER FROM THE ROUTE 
            setEmail(location.state.registeredEmail)
        }
      }, [location.state])



    const startResendTimer = () => {
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


    const sendOtp = async () => {
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



    return (
        <div className='loginDiv flex items-center justify-center h-screen'>
            <Container maxWidth="sm" className='border-2 border-black rounded-lg p-14'>
                <Typography variant="h4" component="h1" gutterBottom align='center'>
                    Email Verification 
                </Typography>
                <form>
                    <TextField label="Registered Email" autoComplete='current-name' type="email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} name='email' value={email} />
                    {(canResendOTP)? ( <Button  onClick={sendOtp} variant="contained" endIcon={<SendIcon />}>   Send </Button>) : ( <Button disabled  onClick={sendOtp} variant="contained" endIcon={<SendIcon />}>   Send </Button>)}
                    <span className='mx-2 font-medium'>{resendTimer} Seconds</span>
                    <TextField autoComplete="current-password" label="OTP" type="number" fullWidth margin="normal" name='otp' onChange={(e) => setInputOtp(e.target.value)} value={inputOtp} />
                    {(canResendOTP)?( <Button disabled style={{ marginTop: '10px' }} variant="contained" color="primary" fullWidth className='mt-3'> Verify </Button>):( <Button  style={{ marginTop: '10px' }} variant="contained" color="primary" fullWidth className='mt-3'> Verify </Button>)}
                   
                </form>
            </Container>
            <ToastContainer />
        </div>

    );
};

export default OtpVerification;
