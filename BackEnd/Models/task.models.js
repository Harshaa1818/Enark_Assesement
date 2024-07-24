import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    taskName:{
        required:true,
        type:String,
        unique:true
    },
    description:{
        required:true,
        type:String
    },
    status:{
        type:Enum,
        choices:["to-do","inprogress","done"]
    },
    priority:{
        type:Enum,
        choices:["low","medium","high"]
    }


},{timestamps:true})

export default Task=mongoose.model(taskSchema,'Task')