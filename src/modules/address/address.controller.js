import { appERROR } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { User } from "../../../database/models/user.model.js";







const addToAddress = catchError(async (req, res, next) => {
    let address =  await User.findByIdAndUpdate(req.user._id
        ,{$push: {addresses: req.body}},{new:true});
    address || next(new appERROR('address not found',404))
    !address ||res.json({message:'successs',address: address.addresses})
     
} )



const removeFromAddress = catchError(async (req, res, next) => {
    let address =  await User.findByIdAndUpdate(req.user._id
        ,{$pull: {addresses: {_id: req.params.id}}},{new:true});
    address || next(new appERROR('address not found',404))
    !address ||res.json({message:'successs',address: address.addresses})
     
} )

const getLoggedUserAddress = catchError(async (req, res, next) => {
    let address =  await User.findById(req.user._id)
    address || next(new appERROR('address not found',404))
    !address ||res.json({message:'successs',address: address.addresses})
     
} )


export {addToAddress,removeFromAddress,getLoggedUserAddress}