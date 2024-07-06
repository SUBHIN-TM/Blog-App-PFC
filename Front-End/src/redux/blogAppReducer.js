import { createSlice } from "@reduxjs/toolkit";

const blogReducer = createSlice({
    name:'BlogAppDataBase',
    initialState:{
        blogPosts:[{}],  //ONLY CREATED ONE STATE TO STORE THE ALL BLOG POSTS TO SHOW IN HOME PAGE
    },
    reducers:{
        fetchDetails:(state,action) =>{  //ACTION TO SET THE ALL BLOG DATA TO REDUC STORE
            state.blogPosts=action.payload
        }
    }
})

export const {fetchDetails}=blogReducer.actions;
export default blogReducer.reducer


