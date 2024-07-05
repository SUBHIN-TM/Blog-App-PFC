import { Button, TextField, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from '../constants/links';


const Login = () => {

  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  })

  const [displayError, setDisplayError] = useState({ //FOR DISPLAYING ERRORS 
    emailError: '',
    passwordError: '',
  })

  const navigate = useNavigate()


  const inputsGetting = (e) => {
    const { name, value } = e.target;
    setInputData((pvs) => ({
      ...pvs,
      [name]: value
    }))
  }



  const forgotPassword = () => {
    navigate('/otpVerification', {
      state: {
        fromForgotPassword: true
      }
    })
  }


  const validation = () => {
    const email = inputData.email.trim()
    const password = inputData.password.trim()

    let counter = 0
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isMailvalid = regex.test(email)

    if (!email) {
      setDisplayError((pvs) => ({
        ...pvs,
        emailError: 'Please Fill The Field'
      }))
      counter++
    } else if (!isMailvalid) {
      setDisplayError((pvs) => ({
        ...pvs,
        emailError: 'Require Valid Email Id'
      }))
      counter++
    } else {
      setDisplayError((pvs) => ({
        ...pvs,
        emailError: ''
      }))
    }
    if (!password) {
      setDisplayError((pvs) => ({
        ...pvs,
        passwordError: 'Please Fill The Field'
      }))
      counter++
    } else if (password.length < 5 || password.length > 20) {
      setDisplayError((pvs) => ({
        ...pvs,
        passwordError: 'Password Length Should be 5-20 Char'
      }))
      counter++
    } else {
      setDisplayError((pvs) => ({
        ...pvs,
        passwordError: ''
      }))
    }
    if (counter == 0) {
      return true
    } else {
      return false
    }

  }


  const submit = async (e) => {
    e.preventDefault()
    const isValid = validation()
    if (isValid) {
     try {
      const response = await axios.post(`${URL}/login`, {
        email: inputData.email,
        password: inputData.password
      })
      if(response.data.token){
        localStorage.setItem('token',response.data.token);
        console.log('Token stored in local storage:', response.data.token);
        navigate('/home')
      }
     
     } catch (error) {
      if(error.response.status==400 ){
        setDisplayError((pvs)=>({
          ...pvs,
          passwordError:error.response.data.message
        }))
      }else if(error.response.status== 404){
        setDisplayError((pvs)=>({
          ...pvs,
          emailError:error.response.data.message
        }))
      } else if(error.response.status== 401){
      toast.error(error.response.data.message,{
        onClose: ()=>{
          navigate('/otpVerification')
        }
      })
      }
      else{
        console.error(error);
        toast.error('An error occurred during Login. Please try again.');
      }
     
     }
    }
  }


  return (
    <div className='backgroundDiv'>
      <div className='loginDiv flex items-center justify-center h-screen p-2'>
        <Container maxWidth="sm" className='border-2 border-black rounded-lg p-14'>
          <Typography variant="h4" component="h1" gutterBottom align='center'>
            Login
          </Typography>
          <form>
            <TextField label="Email" autoComplete='current-email' type="email" fullWidth margin="normal" onChange={inputsGetting} name='email' value={inputData.email} />
            <small className='text-red-500 m-2'>{displayError.emailError}</small>
            <TextField autoComplete="current-password" label="Password" type="password" fullWidth margin="normal" name='password' onChange={inputsGetting} value={inputData.password} />
            <small className='text-red-500 m-2'>{displayError.passwordError}</small>
            <Button onClick={submit} style={{ marginTop: '10px' }} variant="contained" color="primary" fullWidth className='mt-3'>
              Login
            </Button>
            <p onClick={() => navigate('/signUp')} className=' mt-4 cursor-pointer hover:text-blue-500 hover:underline'>Create Your Account ➡️</p>
            <p onClick={forgotPassword} className=' mt-2 cursor-pointer hover:text-red-500 hover:underline'>Forgot Password❗</p>
          </form>
        </Container>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
