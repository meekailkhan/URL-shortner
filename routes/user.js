import express from 'express';
import userController from '../controller/user.js';
import path from 'path';
console.log(path.resolve('../controller/user.js'));


const router = express.Router();

router.post('/signup',userController.userSignupHandle)

router.post('/login',userController.userLoginHandle)

export default router;