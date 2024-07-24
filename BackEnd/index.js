import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DB/index.js';

dotenv.config({
    path: "./.env"
})

const app=express();
app.use(cookieParser())

//importing routers
import {userRouter} from './Routes/user.routes.js'
import {taskRouter} from './Routes/task.routes.js'
import {adminRouter} from  './Routes/admin.routes.js'

app.route("/api/v1/user",userRouter)
app.route('/api/v1/admin',adminRouter)
app.route('/api/v1/task',taskRouter)

try {
    await connectDB();
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    });
} catch (err) {
    console.log("Server error",err);
}



