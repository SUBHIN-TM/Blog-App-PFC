import { configureStore } from "@reduxjs/toolkit";
import blogAppReducer from "./blogAppReducer";


const appStore=configureStore({
    reducer:{
        BlogAppDataBase:blogAppReducer,
    }
})

export default appStore