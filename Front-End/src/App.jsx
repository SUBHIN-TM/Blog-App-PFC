import './App.css'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Home from './Components/Home'
import OtpVerification from './Components/OtpVerification'
import SetNewPassword from './Components/SetNewPassword'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Myposts from './Components/Myposts'
import Layout from './Components/Layout'

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Layout/>} > <Route path='' element={<Home />} /></Route>  
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<SignUp/>} />  
      <Route path='/otpVerification' element={<OtpVerification />} />
      <Route path='/setNewPassword' element={<SetNewPassword />} />
      <Route path='/myPosts' element={<Layout/>} > <Route path='' element={<Myposts />} /></Route>  
      </Routes>
    </Router>
  )
}

export default App