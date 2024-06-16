const express = require("express");
const OrderController = require("../Controllers/OrderController");
const OrderRouter = express.Router();


OrderRouter.post(
    "/place-order",
    (req, res) => {
        const result = new OrderController().placeOrder(req.body);
        result.then(
            (success) => {
                res.send(success)
            }
        )
            .catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)
OrderRouter.post(
    "/order-success",
    (req,res)=>{
        const result =new OrderController().orderSuccess(req.body);
       
        result.then(
            (success)=>{
                res.send(success)
            }
        )
        .catch(
            (error)=>{
               
                res.send(error)
            }
        )
    }
)

OrderRouter.get(
    "/user-orders/:user_id",
    (req,res)=>{
        const result =new OrderController().userOrders(req.params.user_id   );
       
        result.then(
            (success)=>{
                res.send(success)
            }
        )
        .catch(
            (error)=>{
               
                res.send(error)
            }
        )
    }
)
module.exports = OrderRouter;