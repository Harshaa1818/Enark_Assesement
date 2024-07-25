import { Router } from "express";
import {verifyJwt} from '../auth.js'
import {register,login,logout} from '../Controllers/user.controllers.js'

const userRouter=Router();

userRouter.route('/register').post(register)
userRouter.route('/login').post(login)
userRouter.route('/logout').post(verifyJwt,logout)

export {userRouter}


