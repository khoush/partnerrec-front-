
const mongoose = require('mongoose');
const rapport = new mongoose.Schema({

email:String,

nom:String,
rapport:String

})
module.exports=mongoose.model(
    "rapport", rapport

)