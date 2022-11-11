const mongoose = require('mongoose');
const post = new mongoose.Schema({
    
    date_debut : Date,
    date_fin : Date,
    titre  : String,
    descripion :String,
    image : String,
     archive:{
        type:Boolean,
        default:false
     },
})
module.exports=mongoose.model(
    "Post", post

)
