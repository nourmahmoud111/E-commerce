import slugify from "slugify";
import { appERROR } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { SubCategory } from "../../../database/models/subcategory.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


 const addSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subcategory = new SubCategory(req.body);
    await subcategory.save()
    res.json({messaeg:'successs',subcategory})   
} )


const allSubCategories = catchError(async (req, res, next) => {
    let filterObj ={}
    if(req.params.category) filterObj.category = req.params.category
    let apiFeatures =new ApiFeatures(SubCategory.find(filterObj),req.query)
    .pagination().fields().filter().sort().search()
     let subcategories = await apiFeatures.mongooseQuery
     res.json({messaeg:'successs',page:apiFeatures.pageNumber,subcategories})

} )


const getSubCategory = catchError(async (req, res, next) => {
    let subcategory =  await SubCategory.findById(req.params.id);
    subcategory || next(new appERROR('subcategory not found',404))
    !subcategory ||res.json({messaeg:'successs',subcategory})
     
} )


const updateSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subcategory =  await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true});
    subcategory || next(new appERROR('subcategory not found',404))
    !subcategory ||res.json({messaeg:'successs',subcategory})
     
} )


const deleteSubCategory = deleteOne(SubCategory)

export {addSubCategory,allSubCategories,getSubCategory,updateSubCategory,deleteSubCategory}