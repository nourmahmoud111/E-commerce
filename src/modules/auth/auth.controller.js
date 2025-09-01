import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "../../../database/models/user.model.js"
import { appERROR } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"




const signup =catchError(async (req, res, next) => {
    let user = new User (req.body)
    await user.save()
    let token = jwt.sign({userId: user._id, role: user.role},process.env.JWT_KEY)
    res.json({messaeg:"successs",token})   
} )



const signin =catchError(async (req, res, next) => {
    let user = await User.findOne({email: req.body.email})
    if(user && bcrypt.compareSync(req.body.password , user.password)){
    let token = jwt.sign({userId: user._id, role: user.role},process.env.JWT_KEY)
    return res.json({messaeg:"successs",token})   
        }
        next(new appERROR('incorrect email or password', 401))
} )


const changeUserPassword =catchError(async (req, res, next) => {
    let user = await User.findOne({email: req.body.email})
    if(user && bcrypt.compareSync(req.body.oldPassword , user.password)){
    await User.findOneAndUpdate({email: req.body.email},
        {password: req.body.newPassword, passwordChangedAt:Date.now()})

    let token = jwt.sign({userId: user._id, role: user.role},process.env.JWT_KEY)
    return res.json({messaeg:"successs",token})   
        }

        next(new appERROR('incorrect email or password', 401))
} )


//verifying token alternative
const protectedRoutes =catchError(async (req, res, next) => {
   let {token} = req.headers
   let userPayload = null
   if (!token) return next(new appERROR('token not provided', 401)) 
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if(err) return next(new appERROR(err,401))
            userPayload = payload
    })
     

    let user = await User.findById(userPayload.userId) 
    if (!user) return next(new appERROR('user not found', 401)) 
    if(user.passwordChangedAt){ 
        let time = parseInt(user.passwordChangedAt.getTime() / 1000)
        if (time > userPayload.iat) return next(new appERROR('invalid token... login again', 401))
         }
            req.user=user
            next()

} )


//roles = ['user','admin','manager']
const allowedTo = (...roles)=>{
        return catchError(async (req, res, next) => {
        if(roles.includes(req.user.role))
        return next()
        return next(new appERROR('you not authorized to access this endpoint ', 401))
    })
} //authorizathion



export {signin,signup,changeUserPassword,protectedRoutes,allowedTo}