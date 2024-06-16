const express =require("express");
const  mongoose  = require("mongoose");

const cors=require('cors');
const CategoryRouter = require("./Routers/CategoryRouter.js");
const ColorRouter = require("./Routers/ColorRouter.js");
const ProductRouter = require("./Routers/ProductRouter.js");
const UserRouter =require("./Routers/UserRouter.js")
const CartRouter =require("./Routers/CartRouter.js");
const OrderRouter = require("./Routers/OrderRouter.js");
const app =express();
app.use(express.json());
app.use(cors()); 
app.use(express.static("Public"));

app.use("/category",CategoryRouter);
app.use("/color",ColorRouter);
app.use("/product",ProductRouter);
app.use("/user",UserRouter);
app.use("/cart",CartRouter);
app.use("/order",OrderRouter)
mongoose.connect(
    "mongodb://0.0.0.0:27017",
    {
        dbname:"ishop"
    }   
).then(
    ()=>{
        app.listen(
            5000,
            ()=>  console.log('server Start')
        )
    }
).catch(
    (error)=>{
        console.log(error)
        console.log('Unable to Start the Server');
    }
)