import { Router } from "express";
import {verifyJwt} from '../auth.js'
import {homePage,register,login,logout} from '../Controllers/user.controllers.js'

const router=Router();

router.route('/').get(homePage)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(verifyJwt,logout)

export {router}


