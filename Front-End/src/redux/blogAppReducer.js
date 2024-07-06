import { createSlice } from "@reduxjs/toolkit";

const blogReducer = createSlice({
    name:'BlogAppDataBase',
    initialState:{
        blogPosts:[{}],
    },
    reducers:{
        fetchDetails:(state,action) =>{
            state.blogPosts=action.payload
        }
    }
})

export const {fetchDetails}=blogReducer.actions;
export default blogReducer.reducer


