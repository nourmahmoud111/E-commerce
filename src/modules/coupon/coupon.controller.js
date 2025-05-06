import { appERROR } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { Coupon } from "../../../database/models/coupon.model.js";


 const addCoupon = catchError(async (req, res, next) => {
    let isExist = await Coupon.findOne({code:req.body.code})
    if(isExist) return next(new appERROR('coupon exists', 409))
    let coupon = new Coupon(req.body);
    await coupon.save()
    res.json({messaeg:'successs',coupon})   
} )


const allCoupons = catchError(async (req, res, next) => {
       let coupons = await Coupon.find()
       res.json({messaeg:'successs',coupons})
} )


const getCoupon = catchError(async (req, res, next) => {
    let coupon =  await Coupon.findById(req.params.id);
    coupon || next(new appERROR('coupon not found',404))
    !coupon ||res.json({messaeg:'successs',coupon})
     
} )


const updateCoupon = catchError(async (req, res, next) => {
    let coupon =  await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true});
    coupon || next(new appERROR('coupon not found',404))
    !coupon ||res.json({messaeg:'successs',coupon})
     
} )


const deleteCoupon = deleteOne(Coupon)

export {addCoupon,allCoupons,getCoupon,updateCoupon,deleteCoupon}