import mongoose, { Types } from "mongoose";


const schema = new mongoose.Schema({
  name: { 
        type: String,
        unique :[true, 'name is required'],
        required: true ,
        trim :true,
        minlength:[2, 'too short category name']
  },
  slug :{
    type : String,
    lowercase :true,
    requierd :true
  },
category:{
    type: Types.ObjectId,
    ref: 'Category',
    required : true
},

createdBy:{
  type: Types.ObjectId,
  ref: 'User'
}

},{timestamps:true ,versionKey :false})


  export const SubCategory = mongoose.model('SubCategory',schema)
