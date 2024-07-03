import './App.css'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
      < Route path='/' element={<Login />} />
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App