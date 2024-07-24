
import {Router} from 'express'
import {verifyJwt} from '../auth.js'
import {adminLogin,getAllTasks,updateTask,deleteTask,addTask} from '../Controllers/admin.controllers.js'

const router=Router()

router.route('/login').get(adminLogin)
router.route('/getalltasks/:userid').get(verifyJwt,getAllTasks)
router.route('updatetask/:userid').put(verifyJwt,updateTask)
router.route('deletetask/:userid').delete(verifyJwt,deleteTask)
router.route('addtask/:userid').post(verifyJwt,addTask)

export {router}

