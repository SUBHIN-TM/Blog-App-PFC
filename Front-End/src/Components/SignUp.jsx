import { Button, TextField, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { URL } from '../constants/links';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {

  const [inputData, setInputData] = useState({ //STATE TO STORED USER INPUT VALUES
    email: '',
    password: '',
    userName: '',
    confirmPassword: ''
  })

  const [displayError, setDisplayError] = useState({ //FOR DISPLAYING ERRORS 
    emailError: '',
    userNameError: '',
    passwordError: '',
    confirmPasswordError: ''
  })

  const [error, setError] = useState("")  //FOR COMMON ERROR
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const inputsGetting = (e) => { //IT WILL TRACK THE INPUT FIELD WITH NAME AND SAVE ITS APPROPRIATE FIELD VALUE
    const { name, value } = e.target;
    setInputData((pvs) => ({
      ...pvs,
      [name]: value
    }))
  }


  const validation = () => { //SIGNUP FORM VALIDATON
    const email = inputData.email.trim()
    const password = inputData.password.trim()
    const confirmPassword = inputData.confirmPassword.trim()
    const userName = inputData.userName.trim()
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

    if (!confirmPassword) {
      setDisplayError((pvs) => ({
        ...pvs,
        confirmPasswordError: 'Please Fill The Field'
      }))
      counter++
    } else if (password !== confirmPassword) {
      setDisplayError((pvs) => ({
        ...pvs,
        confirmPasswordError: 'Password Doesnot Match'
      }))
      counter++
    } else {
      setDisplayError((pvs) => ({
        ...pvs,
        confirmPasswordError: ''
      }))
    }

    if (!userName) {
      setDisplayError((pvs) => ({
        ...pvs,
        userNameError: 'Please Fill The Field'
      }))
      counter++
    } else if (userName.length < 4 || userName.length > 20) {
      setDisplayError((pvs) => ({
        ...pvs,
        userNameError: 'Length Should be in between 4-20 Char'
      }))
      counter++
    } else {
      setDisplayError((pvs) => ({
        ...pvs,
        userNameError: ''
      }))
    }
    if (counter == 0) {
      return true
    } else {
      return false
    }
  }

  

  const submit = async (e) => { //FORM SUBMISSION SIGNUP
    e.preventDefault();
    const isvalid = validation()//IF THE VALIDATION RETURN TRUE IT WILL SEND THE FORM
    if (isvalid) {
      try {
        setIsLoading(true)
        const response = await axios.post(`${URL}/signUp`, {
          userData: inputData
        })
        if (response) {
          setError("")
          console.log(response);
          toast.success("Registration successful. Redirecting to OTP Verificationpage...", {
            onClose: () => {
              navigate('/otpVerification', {
                state: {
                  registeredEmail: inputData.email
                }
              })
            }
          })
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status
          if (status === 409) {
            if (error.response.data.isMailExist) {
              setError("Email Already Exists")
            } else if (error.response.data.isUserNameExist) {
              setError("User Name Already Exists")
            }
          }
        } else {
          console.error("ERR", error);
          setError('An error occurred during registration. Please try again.');
        }
      }
      finally {
        setIsLoading(false)
      }
    }
  }




 

  return (
    <div className='backgroundDiv'>
    <div className='loginDiv flex items-center justify-center h-screen  p-2'>
      <Container maxWidth="sm" className='border-2 border-black rounded-lg p-14 '>
        <Typography variant="h4" component="h1" gutterBottom align='center'>
          Registration
        </Typography>
        <form>
          <TextField label="Email" autoComplete='current-name' type="email" fullWidth margin="normal" onChange={inputsGetting} name='email' value={inputData.email} />
          <small className='text-red-500 m-2'>{displayError.emailError}</small>
          <TextField label="User Name" autoComplete='user-name' type="text" fullWidth margin="normal" onChange={inputsGetting} name='userName' value={inputData.userName} />
          <small className='text-red-500 m-2'>{displayError.userNameError}</small>
          <TextField autoComplete="current-password" label="Password" type="password" fullWidth margin="normal" name='password' onChange={inputsGetting} value={inputData.password} />
          <small className='text-red-500 m-2'>{displayError.passwordError}</small>
          <TextField autoComplete="current-password" label="Confirm Password" type="password" fullWidth margin="normal" name='confirmPassword' onChange={inputsGetting} value={inputData.confirmPassword} />
          <small className='text-red-500 m-2'>{displayError.confirmPasswordError}</small>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}

          {!isLoading && (
            <Button onClick={submit} style={{ marginTop: '10px' }} variant="contained" color="primary" fullWidth className='mt-3'>
              Login
            </Button>
          )}

          <p onClick={() => navigate('/login')} className='italic mt-3 cursor-pointer hover:text-blue-500 hover:underline'>Back To Login Page ⬅️</p>
        </form>
      </Container>
      <ToastContainer />
    </div>
    </div>

  );
};

export default SignUp;
