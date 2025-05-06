import { appERROR } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { User } from "../../../database/models/user.model.js";


 const addUser = catchError(async (req, res, next) => {
    let user = new User(req.body);
    await user.save()
    res.json({messaeg:'successs',user})   
} )


const allUsers = catchError(async (req, res, next) => {
      let apiFeatures =new ApiFeatures(User.find(),req.query)
       .pagination().fields().filter().sort().search()
       let users = await apiFeatures.mongooseQuery
       res.json({messaeg:'successs',page:apiFeatures.pageNumber,users})
} )


const getUser = catchError(async (req, res, next) => {
    let user =  await User.findById(req.params.id);
    user || next(new appERROR('user not found',404))
    !user ||res.json({messaeg:'successs',user})
     
} )


const updateUser = catchError(async (req, res, next) => { 
    let user =  await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    user || next(new appERROR('user not found',404))
    !user ||res.json({messaeg:'successs',user})
     
} )


const deleteUser = deleteOne(User)

export {addUser,allUsers,getUser,updateUser,deleteUser}