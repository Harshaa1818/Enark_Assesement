import { User } from "../Models/user.models.js";
import { Task } from "../Models/task.models.js";

const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        if(user.password!==password){
            return res.status(401).json({message:"incorrect password"})
        }
        if(user.role!=="admin"){
            return res.status(403).json({message:"unauthorized"})
        }
        const token=user.generateAccessToken()
        return res.status(200).json({message:"login successful",token})
    }
    catch(err){
        return res.status(500).json({message:"server returned an error"})
    }
}
const getAllTasks=async(req,res)=>{
    try{
        const task=await Task.find()

        if(!task){
            return res.status(404).json({message:"no tasks found"})
        }

        return res.status(200).json({ task })

    }
    catch(err){
        return res.status(500).json({message:"server returned an error"})
    }
}
const updateTask=async(req,res)=>{
    try{
        
        const {taskName, description, status, priority}=req.body
        const task=await Task.findOne({taskName})

        if(!task){
            return res.status(404).json({message:"task not found"})
        }

        task.description=description
        task.status=status
        task.priority=priority

        await task.save()

        return res.status(200).json({message:"task updated",task})

    }
    catch(err){
        return res.status(500).json({message:"server returned an error"})
    }
}
const deleteTask=async(req,res)=>{
    try{
        const {taskName}=req.body
        const task=await Task.findOne({taskName})

        if(!task){
            return res.status(404).json({message:"task not found"})
        }

        await Task.deleteOne({taskName})

        return res.status(200).json({message:"task deleted"})
    }
    catch(err){
        return res.status(500).json({message:"server returned an error"})
    }
}
const addTask=async(req,res)=>{
    try{
        const {taskName, description, status, priority, username}=req.body;
        const userId=await User.findOne({username})._id

        const task=await Task.create({taskName, description, status, priority,userId})

        if(!task){
            return res.status(404).json({message:"task not created"})
        }

         task.save()
        return res.status(200).json({message:"task created",task})
    }
    catch(err){
        return res.status(500).json({message:"server returned an error"})
    }
}

export {adminLogin,getAllTasks,updateTask,deleteTask,addTask}