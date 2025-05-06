import mongoose, { Types } from "mongoose";
 
const schema = new mongoose.Schema({
  
  name: { 
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
    unique :[true, 'name is required'],

  },

  image :String,
   
  createdBy:{
    type:Types.ObjectId,
    ref: 'User',
  }

  },{timestamps:true ,versionKey :false})


  schema.post('init' , function(doc){
    doc.image = process.env.BASE_URL + "categories/" + doc.image
  })


  export const Category = mongoose.model('Category',schema)










