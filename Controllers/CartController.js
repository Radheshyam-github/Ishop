const Cart = require("../Models/Cart");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
class CartController {
    moveToCart(user_id, data) {
        return new Promise(
            (res, rej) => {
                try {
                    let flag = false;
                    data.forEach(
                        async (d) => {
                            const cartData = await Cart.findOne({ user_id: user_id, pId: d.pId });
                            if (cartData != null) {
                                Cart.updateOne(
                                    { _id: cartData._id },
                                    { qty: cartData.qty + d.qty }
                                ).then(
                                    () => {

                                    }
                                ).catch(
                                    () => {
                                        flag = true;
                                    }
                                )
                            } else {
                                const cart = new Cart({ user_id, ...d })
                                cart.save()
                                    .then(
                                        () => {

                                        }
                                    ).catch(
                                        () => {
                                            flag = true;
                                        }
                                    )
                            }

                        });
                    if (flag == true) {
                        rej(
                            {
                                msg: "Unable to add Cart",
                                status: 0
                            }
                        )
                    } else {
                        res(
                            {
                                msg: "Added to  Cart",
                                status: 1
                            }
                        )
                    }

                } catch (error) {

                    rej => (
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )
                }
            })
    }

    UserCart(user_id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const UserCart = await Cart.find({ user_id: user_id });
                    res(
                        {
                            UserCart,
                            status: 1
                        }
                    )
                } catch (error) {
                    rej(
                        {
                            msg: 'Internal server Error',
                            status: 0
                        }
                    )
                }
            }
        )
    }

    addToCart(user_id, data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const cartData = await Cart.findOne({ user_id: user_id, pId: data.pId });
                    if (cartData != null) {
                        Cart.updateOne(
                            { _id: cartData._id },
                            { qty: cartData.qty + 1 }
                        ).then(
                            () => {
                                res(
                                    {
                                        msg: "Cart  Updated",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                rej(
                                    {
                                        msg: "Unable to Update the cart",
                                        status: 0
                                    }
                                )
                            }
                        )
                    } else {
                        const cart = new Cart({ user_id, pId: data.pId, qty: 1 })
                        cart.save()
                            .then(
                                () => {
                                    res(
                                        {
                                            msg: "Added to Cart",
                                            status: 1
                                        }
                                    )
                                }
                            ).catch(
                                () => {
                                    rej(
                                        {
                                            msg: "Unable to add the cart ",
                                            status: 0
                                        }
                                    )
                                }
                            )
                    }




                } catch (error) {

                    rej => (
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )
                }
            })
    }

    ChangeQty(user_id, pId, qty) {
        return new Promise(
            (res, rej) => {
                try {
                    Cart.updateOne({ user_id, pId }, { qty: qty })
                        .then(
                            (success) => {
                                res(
                                    {
                                        msg: "Qty Changed ",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                rej(
                                    {
                                        msg: "Unable Qty Changed",
                                        status: 0
                                    }
                                )
                            }
                        )
                } catch (error) {

                    rej(
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )

                }
            }
        )
    }

    removeToCart(user_id, pId) {
        return new Promise(
            (res, rej) => {
                try {
                    Cart.deleteOne({ user_id, pId })
                        .then(
                            (success) => {
                                res(
                                    {
                                        msg: "Product deleted",
                                        status: 1
                                    }
                                )
                            }
                        )
                        .catch(
                            (error) => {
                                console.log(error)
                                rej(
                                    {
                                        msg: "Unable to delete the product",
                                        status: 0
                                    }
                                )
                            }
                        )
                }
                catch (err) {
                    rej(
                        {
                            status: 0,
                            msg: "Internal server error"
                        }
                    )
                }
            }
        )
    }

}
module.exports = CartController;   