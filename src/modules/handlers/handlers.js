import { catchError } from "../../middleware/catchError.js";
import { appERROR } from "../../utils/appError.js";

export const deleteOne =(model)=>{


    return catchError(async (req, res, next) => {
        let document =  await model.findByIdAndDelete(req.params.id);
        document || next(new appERROR('document not found',404))
        !document ||res.json({messaeg:'successs',document})
        
    } )
    
}