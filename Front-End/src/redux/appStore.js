import { configureStore } from "@reduxjs/toolkit";
import blogAppReducer from "./blogAppReducer";


const appStore=configureStore({
    reducer:{
        BlogAppDataBase:blogAppReducer, //STORE NAME AND ITS REDUCERS
    }
})

export default appStore