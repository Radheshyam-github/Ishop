const mongoose=require('mongoose');

const ColorSchema =new mongoose.Schema(
    {
        name:{
            type:String
        },
        slug:{
            type:String
        },
        status:{
            type:Boolean,
            default:true
        }, 
        code: { 
            type: String, 
            required: true
         },
    }
)
const Color=mongoose.model("Color",ColorSchema)

module.exports=Color;