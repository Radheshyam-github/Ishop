const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        slug: {
            type: String
        },
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: "Category"
        },
        color_id: {
            type: mongoose.Types.ObjectId,
            ref: "Color"
        },
        price:{
            type:"number"
        },
        discount:{
            type:"number",
            default:0
        },
        final:{
            type:"number"
        },
        status: {
            type: Boolean,
            default: true
        }
        ,
        best_seller: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
)
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;