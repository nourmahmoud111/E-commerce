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
  },

  logo :String,

  createdBy:{
    type: Types.ObjectId,
    ref: 'User',
  }

  },{timestamps:true ,versionKey :false})


  schema.post('init' , function(doc){
    doc.logo = process.env.BASE_URL + "brands/" + doc.logo
  })



  export const Brand = mongoose.model('Brand',schema)
