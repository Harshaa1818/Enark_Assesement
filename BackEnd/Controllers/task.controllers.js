import { Task } from "../Models/task.models.js";
import { User } from "../Models/user.models.js";

const getTasks = async (req, res) => {
  try {
    const userId = req._id;
    const user = await User.findById(userId);
    const tasks = await Task.find({ userId });
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found" });
    }
    return res.status(200).json({ tasks });
  } catch (err) {
    return res.status(500).json({ message: "Server returned an error" });
  }
};

const addTask = async (req, res) => {
  try {

    const userId = req._id;
    const user = await User.findById(userId);

    const { taskName, description, status, priority } = req.body;
   
    const existingTask = await Task.findOne({ taskName });

    if (existingTask) {
      return res.status(400).json({ message: "Task already exists" });
    }

    if (!(taskName && description && status && priority)) {
      return res.status(400).json({ message: "All task fields are required" });
    }
    const username=user.username;

    const task = await Task.create({ taskName, description, status, priority, userId, username });
    await task.save();

    await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } });

    return res.status(200).json({ message: "Task added successfully", task });
  } catch (err) {
    return res.status(500).json({ message: "Server returned an error", err });
  }
};

const updateTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const { taskName, description, status, priority } = req.body;
  
      if (!(taskName && description && status && priority)) {
        return res.status(400).json({ message: "Update all the information" });
      }
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      task.taskName = taskName;
      task.description = description;
      task.status = status;
      task.priority = priority;
  
      await task.save();
  
      return res.status(200).json({ message: "Task updated successfully", task });
    } catch (err) {
      return res.status(500).json({ message: "Server returned an error", err });
    }
  };
  

  const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req._id;
  
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      await Task.findByIdAndDelete(taskId);
  
      await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });
  
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Server returned an error" });
    }
  };
  

export { getTasks, addTask, updateTask, deleteTask };
