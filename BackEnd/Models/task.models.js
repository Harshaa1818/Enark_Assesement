import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: {
    required: true,
    type: String,
    unique: true,
  },
  description: {
    required: true,
    type: String,
  },
  status: {
    type: String,
    enum: ["to-do", "inprogress", "done"],
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  username:{
    
    type: String,
    required: true,

  }
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
export { taskSchema };
