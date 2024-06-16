const Cryptr = require("cryptr");
const Order = require("../Models/Order")
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { response } = require("express");
const Transaction = require('../Models/Transaction')
const Cart = require('../Models/Cart')
// key id- rzp_test_1JTdmDXsdVxz3D
//key Secret -   sldacW33QwJdHTHDlowLGt5e

const instance = new Razorpay({
    key_id: 'rzp_test_wECOiVNawyQpzg',
    key_secret: 'hpF7rJqKjdGKGaEFTLqmUomH',
});
class OrderController {
    placeOrder(data) {
        return new Promise(
            (res, rej) => {
                try {
                    const order = new Order(data);
                    order.save()
                        .then(
                            (success) => {
                                var options = {
                                    amount: data.order_total * 100,  // amount in the smallest currency unit
                                    currency: "INR",
                                    receipt: order._id
                                };
                                instance.orders.create(
                                    options,
                                    function (err, razorOrder) {

                                        if (!err) {
                                            res(
                                                {
                                                    msg: 'Order Creted',
                                                    order,
                                                    razorOrder,
                                                    status: 1
                                                }
                                            )
                                        } else {
                                            rej(
                                                {
                                                    msg: 'Unable to Created order',
                                                    status: 0
                                                }
                                            )
                                        }

                                    });
                            }
                        ).catch(
                            (error) => {

                                rej(
                                    {
                                        msg: 'Unable to Created',
                                        status: 0
                                    }
                                )
                            }
                        )
                }
                catch (error) {

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
    orderSuccess({ response, order, razorOrder }) {
        return new Promise(
            (res, rej) => {
                try {
                    const hmac = crypto.createHmac('sha256', "hpF7rJqKjdGKGaEFTLqmUomH");
                    hmac.update(response.razorpay_order_id + "|" + response.razorpay_payment_id);
                    const sign = hmac.digest('hex');
                    if (sign === response.razorpay_signature) {
                        const transaction = new Transaction(
                            {
                                order_id: order._id,
                                amount: order.order_total,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                payment_status: 1
                            }
                        )
                        transaction.save()
                            .then(
                                () => {
                                    Order.updateOne(
                                        { _id: order._id },
                                        {
                                            order_status: 1,
                                            razor_pay_id: response.razorpay_payment_id,
                                            transaction_id: transaction._id
                                        }
                                    )
                                        .then(
                                            () => {
                                                Cart.deleteMany({ user_id: order.user_id })
                                                    .then()
                                                    .catch()
                                                res(
                                                    {
                                                        status: 1,
                                                        msg: "Order Placed Successfully"
                                                    }
                                                )
                                            }
                                        )
                                        .catch(
                                            (error) => {

                                                rej({
                                                    status: 0,
                                                    msg: "Internal server error"
                                                })
                                            }
                                        )
                                }
                            ).catch(
                                (error) => {

                                    rej({
                                        status: 0,
                                        msg: "Internal server error"
                                    })
                                })

                    }
                    else {
                        rej(
                            {
                                status: 0,
                                msg: "Payment Not  verified"
                            }
                        )
                    }
                } catch (error) {

                    rej(
                        {
                            msg: 'Internal Server error',
                            status: 0
                        }
                    )
                }
            }
        )
    }
    userOrders(user_id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const orders = await Order.find({ user_id: user_id });
                    res(
                        {
                            status: 1,
                            orders
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
}
module.exports = OrderController;   