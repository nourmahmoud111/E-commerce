import slugify from "slugify";
import { appERROR } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { Product } from "../../../database/models/product.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


 const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    req.body.imageCover=req.files.imageCover[0].filename
    req.body.images=req.files.images.map(img => img.filename)
    let product = new Product(req.body);
    await product.save()
    res.json({messaeg:'successs',product})   
} )



const allProducts = catchError(async (req, res, next) => {
    let apiFeatures =new ApiFeatures(Product.find(),req.query)
    .pagination().fields().filter().sort().search()
    let products = await apiFeatures.mongooseQuery
    res.json({messaeg:'successs',page:apiFeatures.pageNumber,products})
    
} )




const getProduct = catchError(async (req, res, next) => {
    let product =  await Product.findById(req.params.id);
    product || next(new appERROR('product not found',404))
    !product ||res.json({messaeg:'successs',product})
     
} )


const updateProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    let product =  await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    product || next(new appERROR('product not found',404))
    !product ||res.json({messaeg:'successs',product})
     
} )


const deleteProduct = deleteOne(Product)


export {addProduct,allProducts,getProduct,updateProduct,deleteProduct}