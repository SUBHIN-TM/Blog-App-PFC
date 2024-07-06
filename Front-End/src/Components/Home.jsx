import { useDispatch, useSelector } from "react-redux"
import { fetchDetails } from "../redux/blogAppReducer"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { URL } from "../constants/links";
import { ClipLoader } from 'react-spinners';


const Home = () => {
  const allBlogs = useSelector((store) => store.BlogAppDataBase.blogPosts)
  const dispath = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${URL}`)
      if (response) {
        // console.log(response.data.allPosts);
        dispath(fetchDetails(response.data.allPosts))
      }

    } catch (error) {
      console.error(error);
      toast.error('An error occurred during Fetching all posts. Please try again.');
    } finally {
      setLoading(false)
    }
  }



  if (loading || !allBlogs) {
    return (
      <div className="min-h-screen flex justify-center items-center">
         <ClipLoader color="#000000" size={100} />
      </div>
    )
  }


  const formatUserName = (userName) => {
    if (userName) {
      return userName?.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
    }

  }

  return (
    <div className="min-h-screen">

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto">
          {allBlogs ? (
            allBlogs?.map((data) => (
              <div key={data._id} className="mb-6 ">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                      {data?.userRef?.userName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-600">{formatUserName(data?.userRef?.userName)}</h3>
                      <p className="text-gray-500 text-sm">{new Date(data.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <h2 className="ml-1 text-2xl font-bold text-gray-800 underline mb-4">{data.title}</h2>
                  <div className="ml-1 text-gray-700 italic">{data.content}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-700 p-3">No Post Available</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home