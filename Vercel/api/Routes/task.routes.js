import { Router } from "express";
import { verifyJwt } from '../auth.js';
import { getTasks, addTask, updateTask, deleteTask } from '../Controllers/task.controllers.js';

const taskRouter = Router();

taskRouter.route('/').get(verifyJwt, getTasks);
taskRouter.route('/addtask').post(verifyJwt, addTask);
taskRouter.route('/updatetask/:id').put(verifyJwt, updateTask); // Update with task ID
taskRouter.route('/deletetask/:id').delete(verifyJwt, deleteTask); // Delete with task ID

export { taskRouter };
