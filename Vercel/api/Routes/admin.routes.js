
import {Router} from 'express'
import {verifyJwt} from '../auth.js'
import {adminLogin,getAllTasks,updateTask,deleteTask,addTask} from '../Controllers/admin.controllers.js'

const adminRouter=Router()

adminRouter.route('/login').get(adminLogin)
adminRouter.route('/getalltasks').get(verifyJwt,getAllTasks)
adminRouter.route('/updatetask').put(verifyJwt,updateTask)
adminRouter.route('/deletetask').delete(verifyJwt,deleteTask)
adminRouter.route('/addtask').post(verifyJwt,addTask)

export {adminRouter}



