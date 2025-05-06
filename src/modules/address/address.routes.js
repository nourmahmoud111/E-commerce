import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToAddress, getLoggedUserAddress, removeFromAddress } from "./address.controller.js";


const addressRouter = Router()
addressRouter
    .route('/')
    .patch(protectedRoutes,allowedTo('user'),addToAddress)
    .get(protectedRoutes,allowedTo('user'),getLoggedUserAddress)

    addressRouter
    .route('/:id')
    .delete(protectedRoutes,allowedTo('user','admin'),removeFromAddress)



export  default addressRouter