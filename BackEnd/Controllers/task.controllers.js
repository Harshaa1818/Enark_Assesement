import { Task } from "../Models/task.models.js";
import {User} from "../Models/user.models.js"

const getTasks=(req,res)=>{
    try{}
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

        const task=await Task.create({taskName,description,status,priority})
        //console.log(task);
         user.tasks.push(task)
            await user.save()
            console.log(user);
       

        return res.status(200).json({message:"task added successfully"})
    }
    catch(err){
        return res.status(500).json({message:"server returned an error",err})
    }
}
const updateTask=async(req,res)=>{
    try{
        const userId=req._id;
        const user=await User.findById(userId)
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
    
        await Task.findByIdAndUpdate(task._id, {taskName,description,status,priority})

        console.log(task)


        user.tasks.map((tak)=>{
            if(tak._id==task._id){
                task[taskName]=taskName
                task[description]=description
                task.status=status
                task.priority=priority
            }
    })

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
        const {taskId}=req.body

        if(!taskId){
            return res.status(400).json({message:"task id is required"})
        }

        const task=await Task.findByIdAndDelete(taskId)

        if(!task){
            return res.status(404).json({message:"task not found"})
        }

        user.tasks=user.tasks.filter((task)=>task._id!=taskId)

        await user.save()

        return res.status(200).json({message:"task deleted successfully"})

    }
    catch(err){
        return res.status(500).json({message:"server returned an error"})
    }
}


export {getTasks,addTask,updateTask,deleteTask}