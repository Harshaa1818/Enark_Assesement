import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true

    },
    password:{
        required:true,
        type:String,

    },
    role:{
        required:true,
        type:Enum,
        choices:['admin','user']

    },
    tasks:{
       type: [Task]
    }
},{timestamps:true})

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            password:this.password
        },
        process.env.SECRET_KEY,
        process.env.EXPIRY_PERIOD

    )

}

export default User=mongoose.model(userSchema,'User')