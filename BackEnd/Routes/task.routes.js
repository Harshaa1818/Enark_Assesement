import { Router } from "express";
import {verifyJwt} from '../auth.js'
import { getTasks , addTask , updateTask , deleteTask } from '../Controllers/task.controllers.js'

const taskRouter=Router();

taskRouter.route('/').get(verifyJwt, getTasks);
taskRouter.route('/addtask').post( verifyJwt, addTask)
taskRouter.route('/updatetask').put(verifyJwt,updateTask)
taskRouter.route('/deletetask').delete(verifyJwt,deleteTask)

export {taskRouter}