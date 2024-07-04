import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, TextField, Container, Typography } from '@mui/material';
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from '../constants/links';


const SetNewPassword = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const location = useLocation();
    const navigate=useNavigate()
    const [displayError, setDisplayError] = useState({ //FOR DISPLAYING ERRORS 
        passwordError: '',
        confirmPasswordError: ''
    })

    useEffect(() => {
        if (location?.state?.email) {
            setEmail(location?.state?.email)
        }
    }, [location.state])




    const validation = () => {
        let counter = 0
        const Password=password.trim()
        if (!Password.trim()) {
            setDisplayError((pvs) => ({
                ...pvs,
                passwordError: 'Please Fill The Field'
            }))
            counter++
        } else if (Password.length < 5 || Password.length > 20) {
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

        if (counter == 0) {
            return true
        } else {
            return false
        }
    }


    const submit = async (e) => {
        e.preventDefault()
        const isvalid = validation()
        if(isvalid){
            try {
                console.log(email,password);
                const response=await axios.post(`${URL}/resetPassword`,{email,newPassword:password})
                if(response.data){
                    toast.success(response.data.message,{
                        onClose:()=>{
                            navigate('/')
                        }
                    })
                }else{
                    toast.error('Password reset failed');
                }
            } catch (error) {
                if(error.response.status==404){
                    toast.error(error.response.data.message)
                }else{
                    toast.error('Something went wrong');
                    console.error(error);
                }        
            }
        }
    }


    return (
        <div className='backgroundDiv'>
            <div className='loginDiv flex items-center justify-center h-screen p-2'>
                <Container maxWidth="sm" className='border-2 border-black rounded-lg p-14'>
                    <Typography variant="h4" component="h1" gutterBottom align='center'>
                        Reset Password
                    </Typography>
                    <form>
                        <TextField label="New Password" autoComplete='current-password' type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} name='email' value={password} />
                        <small className='text-red-500 m-2'>{displayError.passwordError}</small>
                        <TextField label="Confirm Password" autoComplete="current-password" type="password" fullWidth margin="normal" name='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                        <small className='text-red-500 m-2'>{displayError.confirmPasswordError}</small>
                        <Button onClick={submit} style={{ marginTop: '10px' }} variant="contained" color="primary" fullWidth className='mt-3'>
                            submit
                        </Button>
                    </form>
                </Container>
                <ToastContainer />
            </div>
        </div>
    )
}

export default SetNewPassword