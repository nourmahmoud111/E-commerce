import mongoose, { Types } from "mongoose";
 
const schema = new mongoose.Schema({
  
    title: { 
        type: String,
        unique :[true, 'name is required'],
        required: true ,
        trim :true,
        minlength:[2, 'too short category name'],
  },

  slug :{
    type : String,
    lowercase :true,
    requierd :true,
  },

  description :{
      type : String ,
      required : true ,
      minlength:5,
      maxlength:2000,
  },

  imageCover :String,
  images :[String],

  price :{
    type:String,
    required :true,
    min :0,
  },

  priceAfterDiscount :{
    type:String,
    required :true,
    min :0,
  },

  sold :Number,

  stock:{
    type:Number,
    min:0,
  },
  category:{
    type: Types.ObjectId,
    ref: 'Category',
  },
  subcategory:{
    type: Types.ObjectId,
    ref: 'SubCategory',
  },
  brand:{
    type: Types.ObjectId,
    ref: 'Brand',
  },
ratAvg:{
    type:Number,
    min:0,
    max:5,
},
rateCount:Number,

createdBy:{
    type: Types.ObjectId,
    ref: 'User',
  }

  },
  
  {timestamps:true ,versionKey :false ,toJSON:{virtuals:true} ,id: false})


//virtual populate
  schema.virtual('myReviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'product'
  })
  schema.pre('findOne', function(){
    this.populate('myReviews')
  })



//upload image
  schema.post('init' , function(doc){
   if(doc.imageCover)  doc.imageCover = process.env.BASE_URL + "products/" + doc.imageCover
    if(doc.images)  doc.images = doc.images.map(img => process.env.BASE_URL +"products/" + img)
  })


export const Product = mongoose.model('Product',schema)
