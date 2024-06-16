const express = require("express");
const CartController = require("../Controllers/CartController")
CartRouter = express.Router();

CartRouter.post(
    "/move-to-cart/:user_id",
    (req, res) => {
        const respose = new CartController().moveToCart(req.params.user_id, req.body);
        respose
            .then(
                (sucess) => {
                    res.send(sucess)
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
    }
)

CartRouter.get(
    "/user-cart/:user_id",
    (req, res) => {
        const respose = new CartController().UserCart(req.params.user_id);
        respose
            .then(
                (sucess) => {
                    res.send(sucess);

                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
    }
)

CartRouter.post(
    "/add-to-cart/:user_id",
    (req, res) => {
        const respose = new CartController().addToCart(req.params.user_id, req.body);
        respose
            .then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
    }
)

CartRouter.get(
    "/update-qty/:user_id/:pId/:qty",
    (req, res) => {
        const respose = new CartController().ChangeQty(req.params.user_id, req.params.pId, req.params.qty);
        respose
            .then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)
CartRouter.delete(
    "/delete/:user_id/:pId",
    (req,res)=>{
        const respose =new CartController().removeToCart(req.params.user_id, req.params.pId)
        respose
        .then(
            (success)=>{
                res.send(success);
            }
        ) .catch(
            (error)=>{
                res.send(error);
            }
        )
    }
)

module.exports = CartRouter;
