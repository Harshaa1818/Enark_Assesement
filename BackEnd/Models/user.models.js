import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import {taskSchema} from './task.models.js'

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String,
        enum: ['admin', 'user']
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
    
  
}, { timestamps: true });

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            password:this.password
        },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.EXPIRY_PERIOD
        }

    )

}

export const User=mongoose.model('User', userSchema)