const mongoose = require('mongoose');
const meet = new mongoose.Schema({
    
    
    titre  : String,
    date_fin : Date,
    date_debut : Date,
    
     archive:{
        type:Boolean,
        default:false
     },
})
module.exports=mongoose.model(
    "Meeting", meet

)