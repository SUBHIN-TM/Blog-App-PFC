import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let connect=()=>{
  mongoose.connect(process.env.MONGOLINK, {
    socketTimeoutMS: 0, 
    connectTimeoutMS: 0 
  })

  .then(()=>{
    console.log("MongoDb is connected");
  })
  .catch((err)=>{
    console.log("Mongo connection Error",err);
   })
}

export default connect;