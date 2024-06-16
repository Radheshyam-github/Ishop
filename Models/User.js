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
        contact:{
            type:String,
            unique:true,
            default:null
        },
        address:{
            type:String,
            default:null
        },
        password:{
            type:String
           
        }, 
        forget_password_otp:{
            type:String,
            default:null
        },
        status: { 
            type: Boolean, 
            default:true    
         },
    }
)
const User=mongoose.model("User",UserSchema)

module.exports=User;