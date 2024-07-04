import { Button, TextField, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  console.log(inputData.email, "\n", inputData.password);
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

  return (
    <div className='backgroundDiv'>
      <div className='loginDiv flex items-center justify-center h-screen p-2'>
        <Container maxWidth="sm" className='border-2 border-black rounded-lg p-14'>
          <Typography variant="h4" component="h1" gutterBottom align='center'>
            Login
          </Typography>
          <form>
            <TextField label="Email" autoComplete='current-name' type="email" fullWidth margin="normal" onChange={inputsGetting} name='email' value={inputData.email} />
            <small className='text-red-500 m-2'>Invalid Email</small>
            <TextField autoComplete="current-password" label="Password" type="password" fullWidth margin="normal" name='password' onChange={inputsGetting} value={inputData.password} />
            <small className='text-red-500 m-2'>Incorrect Password </small>
            <Button style={{ marginTop: '10px' }} variant="contained" color="primary" fullWidth className='mt-3'>
              Login
            </Button>
            <p onClick={() => navigate('/signUp')} className=' mt-4 cursor-pointer hover:text-blue-500 hover:underline'>Create Your Account ➡️</p>
            <p onClick={forgotPassword} className=' mt-2 cursor-pointer hover:text-red-500 hover:underline'>Forgot Password❗</p>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default Login;
