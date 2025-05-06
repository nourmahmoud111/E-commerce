import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createCheckutSession, getAllOrders, getUserOrders } from "./order.controller.js";


const orderRouter = Router()
orderRouter
    .route('/')
    .get(protectedRoutes,allowedTo('admin'),getAllOrders)

    orderRouter
    .get('/users',protectedRoutes,allowedTo('admin','user'),getUserOrders)


     orderRouter
     .route('/:id')
     .post(protectedRoutes,allowedTo('user'),createCashOrder)

     orderRouter
     .post('/checkout/:id',protectedRoutes,allowedTo('user'),createCheckutSession)
 


export  default orderRouter