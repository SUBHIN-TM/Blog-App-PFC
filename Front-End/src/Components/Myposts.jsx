import axios from "axios"
import { useEffect, useState } from "react"
import { URL } from "../constants/links"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Myposts = () => {
    const [isModal, setIsmodal] = useState(false)  //STATE FOR MODAL OPEN AND CLOSE
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [titleError, setTitleError] = useState("")
    const [contentError, setContentError] = useState("")
    const [myPosts, setMyPosts] = useState("")
    const navigate = useNavigate()
    const [waiting, setWaiting] = useState(false) //THIS WILL TRIGGER EVERY AXIOS ACTIONS SO USEEFFECT CAN USE BY THIS LOGIC

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')
        } else {
            fetchMyPosts()
        }
    }, [waiting])

    const fetchMyPosts = async () => {
        try {
            const response = await axios.get(`${URL}/myPosts`)
            if (response) {
                setMyPosts(response.data.myPosts)
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred during Fetchin my posts. Please try again.');
        }
    }

    console.log(myPosts);
    const modalOpen = () => { //MODAL TOGGLE VIEW FUNCTION
        if (isModal) {
            setIsmodal(false)
        } else {
            setIsmodal(true)
        }
    }

    const cancel = () => {
        setIsmodal(false)
        setTitle("")
        setContent("")
    }

    const validation = () => {
        let couter = 0
        let Title = title.trim()
        let Content = content.trim()
        if (Title.length < 5 || Title.length > 100) {
            setTitleError("Title must be between 5 and 100 characters")
            couter = 1
        } else {
            setTitleError("")
        }
        if (Content.length < 20 || Content.length > 5000) {
            setContentError("Content must be between 20 and 5000 characters.")
            couter = 1
        } else {
            setContentError("")
        }
        if (couter == 0) {
            return true
        } else {
            return false
        }
    }

    const submit = async () => {
        const isValidated = validation()
        if (isValidated) {
            try {
                setWaiting(true)
                const response = await axios.post(`${URL}/contentPost`, { content, title })
                if (response) {
                    toast.success(response.data.message)
                    cancel()

                }
            } catch (error) {
                console.error(error);
                toast.error('An error occurred during post add. Please try again.');

            } finally {
                setWaiting(false)
            }
        }
    }

    const deletePost=async (postId)=>{
        try {
            setWaiting(true)
            const response=await axios.delete(`${URL}/deletePost/${postId}`)
            if(response.data){
                toast.success(response.data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred during Delete post. Please try again.');
        }finally{
            setWaiting(false)
        }
    }


    return (
        <div className='min-h-screen'>
            <div>
                <button onClick={modalOpen} className='border-2 border-black m-2 p-1 bg-black text-white hover:rounded-xl'>Add New Post</button>
                {isModal && (
                    <div className="modal-overlay">
                        <div className="postModal p-7 border-black border-2  bg-white rounded shadow-xl">
                            <div className="grid">
                                <input type="text" name="title" className="p-1 px-2 rounded-xl w-6/12" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <small className="m-1 text-red-500">{titleError}</small>
                            </div>
                            <div>
                                <textarea placeholder="Content" className="mt-2 border p-1 w-full border-black rounded-xl" name="content" rows="10" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                                <small className="m-1 text-red-500">{contentError}</small>
                            </div>
                            <div className="mt-2 flex justify-end">
                                <button className="border bg-gray-600 text-white font-semibold px-3 py-1 mr-2 hover:bg-red-600" onClick={() => cancel()}>Cancel</button>
                                <button className="border bg-blue-600 text-white font-semibold px-3 py-1 hover:bg-green-500" onClick={submit}>Post</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div>
                {myPosts ? (
                    myPosts.map((data) => (
                        <div key={data._id} className="bg-white  p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-2xl font-bold underline mb-4">{data.title}</h2>
                            <div className="italic">{data.content}</div>
                            <div className="flex gap-4 mt-3">
                                <button onClick={()=>deletePost(data._id)} className="p-1 px-2 border bg-gray-600 text-white hover:bg-red-600">Delete</button>
                                <button className="p-1 px-2 border bg-gray-600 text-white hover:bg-orange-500">Edit</button>
                            </div>
                        </div>
                    ))


                ) : (<div className="p-3">No Post Added</div>)}
            </div>

            <ToastContainer />
        </div>
    )
}

export default Myposts