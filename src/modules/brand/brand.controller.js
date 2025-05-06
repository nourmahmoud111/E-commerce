import slugify from "slugify";
import { appERROR } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { Brand } from "../../../database/models/brand.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


 const addBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let brand = new Brand(req.body);
    await brand.save()
    res.json({messaeg:'successs',brand})   
} )


const allBrands = catchError(async (req, res, next) => {
      let apiFeatures =new ApiFeatures(Brand.find(),req.query)
       .pagination().fields().filter().sort().search()
       let brands = await apiFeatures.mongooseQuery
       res.json({messaeg:'successs',page:apiFeatures.pageNumber,brands})
} )


const getBrand = catchError(async (req, res, next) => {
    let brand =  await Brand.findById(req.params.id);
    brand || next(new appERROR('brand not found',404))
    !brand ||res.json({messaeg:'successs',brand})
     
} )


const updateBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    if (req.file) req.body.logo = req.file.filename
    let brand =  await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true});
    brand || next(new appERROR('brand not found',404))
    !brand ||res.json({messaeg:'successs',brand})
     
} )


const deleteBrand = deleteOne(Brand)

export {addBrand,allBrands,getBrand,updateBrand,deleteBrand}