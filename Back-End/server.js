import express from "express"
import cors from "cors"
import user from "./routers/user.js"
import connect from "./config/mongoDbConnection.js"

const app=express()
const port=3000
connect() //MONGO DB CONNECTION
app.use(express.json()) //PARSER
app.use(cors()) 
app.use('/',user) //CREATED USER ROUTER

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})