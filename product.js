const mongoose=require('mongoose');
const productSchema= mongoose.Schema({
       id:{
              type:Number,
              required:true
       },
       name:{
              type:String,
              required:true
       },
       url:{
              type:String,
              required:true
       },
       label:{
              type:String,
              required:true
       },
       number:{
              type:Number,
              required:true
       },
       state:{
              type:String,
              required:true
       },
       locked:{

              type:Boolean,
              required:true
       },
    shortDescription:{
           type:String,
           required:true
    },
    description:{
       type:String,
       required:true
},
date:{
       type:Date,
       required:true
    }
   });

   module.exports = mongoose.model('Product',productSchema)
