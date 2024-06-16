const mongoose=require('mongoose');

const UserSchema =new mongoose.Schema(
    {
        name:{
            type:String
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String
           
        }, 
        status: { 
            type: Boolean, 
            default:true    
         },
    }
)
const User=mongoose.model("User",UserSchema)

module.exports=User;