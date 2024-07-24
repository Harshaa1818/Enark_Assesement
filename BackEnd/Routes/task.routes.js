import { Router } from "express";
import {verifyJwt} from '../auth.js'
import {getTasks,addTask,updateTask,deleteTask} from '../Controllers/task.controllers.js'

const router=Router();

router.route('/').get(verifyJwt, getTasks);
router.route('/addtask').post(verifyJwt,addTask)
router.route('/updatetask').put(verifyJwt,updateTask)
router.route('/deletetask').delete(verifyJwt,deleteTask)

export {router}