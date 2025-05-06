import slugify from "slugify";
import { Category } from "../../../database/models/category.model.js";
import { appERROR } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


 const addCategory = catchError(async (req, res, next) => {
      req.body.slug = slugify(req.body.name)
      req.body.image = req.file.filename
    let category = new Category(req.body);
    await category.save()
    res.json({messaeg:'successs',category})  
} )


const allCategories = catchError(async (req, res, next) => {
      let apiFeatures =new ApiFeatures(Category.find(),req.query)
      .pagination().fields().filter().sort().search()
      let categories = await apiFeatures.mongooseQuery
      res.json({messaeg:'successs',page:apiFeatures.pageNumber,categories})
} )


const getCategory = catchError(async (req, res, next) => {
    let category =  await Category.findById(req.params.id);
    category || next(new appERROR('category not found',404))
    !category ||res.json({messaeg:'successs',category})
     
} )


const updateCategory = catchError(async (req, res, next) => {
   req.body.slug = slugify(req.body.name)
   if (req.file) req.body.image = req.file.filename
    let category =  await Category.findByIdAndUpdate(req.params.id,req.body,{new:true});
    category || next(new appERROR('category not found',404))
    !category ||res.json({messaeg:'successs',category})
     
} )


const deleteCategory =deleteOne(Category)

export {addCategory,allCategories,getCategory,updateCategory,deleteCategory}