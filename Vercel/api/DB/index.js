import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({
    path:"../.env"
})


const connectDB=()=>{
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("DB connection eshtablished")

})
.catch((err)=>{
    console.log("Mongo DB error",err)
})



}
export default connectDB;

