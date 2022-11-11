const mongoose = require('mongoose');
const condidat = new mongoose.Schema({
 
    name : String,
    Email :String,
    position :String,
    office : String,
    Age : Number,
    Start_date : Date,
    Salary : Number,

  image:String,
   cv:String,
   archive:{
    type:Boolean,
    default:false
   }






})
module.exports=mongoose.model(
    "condidat", condidat

)