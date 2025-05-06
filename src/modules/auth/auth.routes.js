import express from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import { changeUserPassword, signin, signup } from "./auth.controller.js";


const authRouter = express.Router()
authRouter.post('/signup',checkEmail,signup)
authRouter.post('/signin',signin)
authRouter.patch('/change-password',changeUserPassword)



export  default authRouter