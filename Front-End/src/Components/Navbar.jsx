import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'




const Navbar = () => {
  const [isLogined, setIsLogined] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogined(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload()
  }

  return (
    <div className=''>
      <nav className='h-12 p-2  bg-gray-600 text-white flex justify-between items-center '>
        <h1 className='hover:text-red-500 sm:w-7/12  xl:w-8/12 sm:text-3xl text-lg sm:px-6  px-2 cursor-pointer italic' onClick={() => navigate('/')}>BL⭕G  <span className='ml-1'></span></h1>
        <button className=' hover:text-black sm:text-lg sm:font-medium' onClick={() => navigate('/')}>Home</button>
        <button className='hover:text-black sm:text-lg sm:font-medium' onClick={() => navigate('/myPosts')}>My Posts</button>
        {isLogined ? (<button className='sm:text-lg sm:font-medium hover:text-black px-2 sm:mr-10' onClick={logout}>Logout</button>) : (<button className='px-2 sm:mr-10 sm:text-lg sm:font-medium hover:text-black' onClick={() => navigate('/login')}>Login</button>)}
      </nav>
    </div>
  )
}

export default Navbar