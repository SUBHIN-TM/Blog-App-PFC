import axios from "axios"
import { useEffect, useState } from "react"
import { URL } from "../constants/links"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { ClipLoader } from 'react-spinners';


const Myposts = () => {
    const [isModal, setIsmodal] = useState(false)  //STATE FOR MODAL OPEN AND CLOSE
    const [isEditModal, setIsEditModal] = useState(false) // STATE FOR POST MODAL CONVERT TO EDIT MODAL , SAME MODAL USED FOR POST AND EDIT
    const [editPostId, setEditPostId] = useState("") //STORE THE ID OF POST WHICH SHOULD BE UPDATED
    const [title, setTitle] = useState("") //STORE INPUT FIELD VALUE OF USER
    const [content, setContent] = useState("") //STORE INPUT FIELD VALUE OF USER
    const [titleError, setTitleError] = useState("") //DISPLAY ERROR
    const [contentError, setContentError] = useState("") //DISPLAY ERROR
    const [myPosts, setMyPosts] = useState("") //STORE THE USER POSTED BLOGS IN THIS STATE
    const [waiting, setWaiting] = useState(false) //THIS WILL TRIGGER EVERY AXIOS ACTIONS SO USEEFFECT CAN USE BY THIS LOGIC
    const [loading,setLoading]=useState(false)  //THIS IS FOR TO DISPLAY SPINNERS WHILE FETCHING
    const navigate = useNavigate() 

    useEffect(() => {
        const token = localStorage.getItem('token'); //IT CHECK WHEATHER THE TOKEN EXIST OR NOT , BECASUSE ONLY LOGINED USERS CAN ACCESS THIS
        if (!token) {
            navigate('/login')
        } else {
            fetchMyPosts()  //IF TOKEN EXISTS FETCHING THE LOGED USER BLOG POSTS
        }
    }, [waiting])


    const fetchMyPosts = async () => { //FUNCTION FOR FETCHING LOGINED USER BLOGS
        try {
            setLoading(true) //TO TRIGGER THE SPINNEERS
            const response = await axios.get(`${URL}/myPosts`)
            if (response) {
                setMyPosts(response.data.myPosts)
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred during Fetchin my posts. Please try again.');
        }finally{
            setLoading(false)
        }
    }

   
    const modalOpen = () => { //MODAL TOGGLE VIEW FUNCTION
        if (isModal) {
            setIsmodal(false)
        } else {
            setIsmodal(true)
        }
    }

    const cancel = () => { //IF THE POST WANT TO CANCEL ,IT WILL CLEAR ALL
        setIsmodal(false)
        setTitle("")
        setContent("")
    }

    const validation = () => { //VALIDATION FOR INPUT FIELDS
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


    const submit = async () => { //IF VALIDATION SUCCESS THEN IT PROCEED CREATE POST
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





    const deletePost = async (postId) => { //AFTER PERFORM DELETE BUTTON IT REQUIRES CONFIRMATION
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete the post?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {  //IF CONFIRMED DELETION IT WIL PROCEED
                        deleteProceed()
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return
                    }
                }
            ]
        });


        const deleteProceed = async () => { //DELETE POST FUNCION
            try {
                setWaiting(true)
                const response = await axios.delete(`${URL}/deletePost/${postId}`)
                if (response.data) {
                    toast.success(response.data.message)
                }
            } catch (error) {
                console.error(error);
                toast.error('An error occurred during Delete post. Please try again.');
            } finally {
                setWaiting(false)
            }
        }
    }



    const editModal = async (postId, title, content) => { //EDIT BUTTON
        setIsmodal(true) //OPEN THE MODAL BY GETTING TRUE
        setIsEditModal(true) //POST MODAL BUTTON CHANGE TO EDIT BUTTON
        setTitle(title)
        setContent(content)
        setEditPostId(postId) //IT WILL WRITE THE POST ID TO EDIT
    }


    const editPost = async () => { //EDIT POST FUNCTION
        const isValidated = validation()
        if(isValidated){
            try {
                setWaiting(true)
                const response = await axios.put(`${URL}/editPost/${editPostId}`, { title, content })
                if(response){
                    toast.success(response.data.message)
                    cancel()
                }
    
            } catch (error) {
                console.error(error);
                toast.error('An error occurred during Edit post. Please try again.');
            }
            finally {
                setWaiting(false)
            }
        }
    }

    if(loading){ //IF LOADING IT WILL DISPLAY SPINNER
        return (
            <div className="min-h-screen flex justify-center items-center">
               <ClipLoader color="#000000" size={100} />
            </div>
          )
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
                                {isEditModal ? (<button className="border bg-blue-600 text-white font-semibold px-3 py-1 hover:bg-green-500" onClick={editPost}>Edit</button>) :
                                    (<button className="border bg-blue-600 text-white font-semibold px-3 py-1 hover:bg-green-500" onClick={submit}>Post</button>)}

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
                                <button onClick={() => deletePost(data._id)} className="p-1 px-2 border bg-gray-600 text-white hover:bg-red-600">Delete</button>
                                <button onClick={() => editModal(data._id, data.title, data.content)} className="p-1 px-2 border bg-gray-600 text-white hover:bg-orange-500">Edit</button>
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