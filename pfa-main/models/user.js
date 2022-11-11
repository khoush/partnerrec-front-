const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const user = new mongoose.Schema({
    firstname: 
    {type : String
    
    },
    lastname: 
    {type : String
    
    },
    email:
    {type: String},
    password: 
    {type : String
    
    },
    role:
    {type: String, enum:['admin']
     },
     image:String,
     passwordHash: {
        type: String,
      },
      password_last_update: {
        type: Date,
        default: Date.now(),
      },
   

    

},
{
    Timestamp:true
}
);

module.exports=mongoose.model(
    "User", user

)

