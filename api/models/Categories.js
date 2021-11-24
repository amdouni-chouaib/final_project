const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
  name:{
      type:String,
      required:true
  }
}, { timestamps: true }  //timestamps will  be given on creation and updation automatically
);

module.exports=mongoose.model('Category',CategorySchema) 
//model name is cat