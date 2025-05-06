import { appERROR } from "../utils/appError.js"

export const catchError = (fn) => {
    return (req,res,next) => {
        fn  (req,res,next).catch(err => {
            next(new appERROR(err ,500))
        })
    }
}