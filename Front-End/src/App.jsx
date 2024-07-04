import './App.css'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Home from './Components/Home'
import OtpVerification from './Components/OtpVerification'
import SetNewPassword from './Components/SetNewPassword'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
      < Route path='/' element={<Login />} />
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/home' element={<Home />} />
      <Route path='/otpVerification' element={<OtpVerification />} />
      <Route path='/setNewPassword' element={<SetNewPassword />} />
      </Routes>
    </Router>
  )
}

export default App