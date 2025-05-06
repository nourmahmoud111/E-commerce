let mode ="prod"
export const globalError= (err,req,res,next)=>{
    let code = err.statusCode || 500
    if(mode == "development"){
    res.status(code).json({message:"error",code, err:err.stack})
}   else{
    res.status(code).json({message:"error",code, err:err.message})
}

    }