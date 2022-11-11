const mongoose = require('mongoose');
const event = new mongoose.Schema({
    
    
    title  : String,
    end : Date,
    start : Date,
     archive:{
        type:Boolean,
        default:false
     },
})
module.exports=mongoose.model(
    "event", event

)