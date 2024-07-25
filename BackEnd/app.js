import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'


dotenv.config({
    path: "./.env"
})

const app=express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true

}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit: "16kb"}))
app.use(express.static('public'))
app.use(cookieParser())


//importing routers
import {userRouter} from './Routes/user.routes.js'
import {taskRouter} from './Routes/task.routes.js'
import {adminRouter} from  './Routes/admin.routes.js'

app.use('/api/v1/user',userRouter)
app.use('/api/v1/task',taskRouter)
app.use('/api/v1/admin',adminRouter)


export default app