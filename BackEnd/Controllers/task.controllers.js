import { Task } from "../Models/task.models.js";
import {User} from "../Models/user.models.js"

const getTasks=async(req,res)=>{
    try{
        const userId=req._id;
        const user=await User.findById(userId)
        const tasks=await Task.find({userId})
        if(!tasks){
            return res.status(404).json({message:"no tasks found"})
        }
        return res.status(200).json({tasks})
    }
    catch(err){
        return res.status(500).json({message:"server returned an error"})
    }
}
const addTask=async(req,res)=>{
    try{
        const userId=req._id;
        const user=await User.findById(userId)

        
        const {taskName,description,status,priority}=req.body

        if(!(taskName && description && status && priority)){
            return res.status(400).json({message:"task is required"})
        }

       const task= await Task.create({taskName,description,status,priority, userId})
        
        await task.save()

        await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } });

       

        //  user.tasks.push(task)
        //     await user.save()
        //     console.log(user);
       

        return res.status(200).json({message:"task added successfully"})
    }
    catch(err){
        return res.status(500).json({message:"server returned an error",err})
    }
}
const updateTask=async(req,res)=>{
    try{
      
        const {taskName,description,status,priority}=req.body

        if(!(taskName && description && status && priority)){
            return res.status(400).json({message:"update all the information"})
        }

        const task=await Task.findOne({taskName})
        

        if(!task){
            return res.status(404).json({message:"task not found"})
        }

        
       

         await Task.findByIdAndUpdate(task._id,{ 
            taskName:taskName,
            description:description,
            status:status,
            priority:priority
        })
    
        

        console.log(task)


        

        return res.status(200).json({message:"task updated successfully"})
    }
    catch(err){
        return res.status(500).json({message:"server returned an error",err})
    }
}
const deleteTask=async(req,res)=>{
    try{
        const userId=req._id;
        const user=await User.findById(userId)
        const {taskName}=req.body

        if(!taskName){
            return res.status(400).json({message:"task id is required"})
        }

        const task=await Task.find({taskName})
        await Task.findByIdAndDelete(task._id)
        
        

        if(!task){
            return res.status(404).json({message:"task not found"})
        }

        user.tasks.map((tak)=>{
            if(tak._id==task._id){
                user.tasks.splice(user.tasks.indexOf(tak),1)
            }
        })
        user.save()
        

        return res.status(200).json({message:"task deleted successfully"})

    }
    catch(err){
        return res.status(500).json({message:"server returned an error"})
    }
}


export {getTasks,addTask,updateTask,deleteTask}