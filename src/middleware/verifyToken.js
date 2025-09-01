import { jwt } from "jsonwebtoken"

export const verifyToken = async (req,res,next)=>{
    let {key,token} =req.headers.token.split(' ')

    jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
        if(err) return res.status(401).json({message:'invalid token', err})
            req.user = decoded

            next()
    })
}