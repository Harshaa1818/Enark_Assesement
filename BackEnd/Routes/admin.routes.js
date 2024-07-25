
import {Router} from 'express'
import {verifyJwt} from '../auth.js'
import {adminLogin,getAllTasks,updateTask,deleteTask,addTask} from '../Controllers/admin.controllers.js'

const adminRouter=Router()

adminRouter.route('/login').get(adminLogin)
adminRouter.route('/getalltasks/:userid').get(verifyJwt,getAllTasks)
adminRouter.route('updatetask/:userid').put(verifyJwt,updateTask)
adminRouter.route('deletetask/:userid').delete(verifyJwt,deleteTask)
adminRouter.route('addtask/:userid').post(verifyJwt,addTask)

export {adminRouter}

