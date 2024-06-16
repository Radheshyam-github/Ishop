import React, { useEffect, useState } from 'react';
import ProfileTab from '../../Profile/ProfileTab';
import { useSelector } from 'react-redux';
// import { generateInvoice } from "../../scripts/generateInvoice";
import axios from 'axios';
const Orders = () => {
  const [localUser, setlocalUser] = useState({});
    const {user} = useSelector(store => store.user)
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const { imgBaseUrl } = useSelector((store) => store.product);
    const [totalCost, setTotalCost] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    useEffect(
        () => {
            if (user != null) {
                axios.get(`http://localhost:5000/order/user-orders/${user._id}`)
                    .then(
                        (success) => {
                            if (success.data.status == 1) {
                                setOrders(success.data.Orders);
                            }
                        }
                    ).catch(
                        () => {

                        }
                    )
            }
        }, [user]
    )

    
       
      
    return (
        <div className='max-w-[1200px] mx-auto'>
            <ProfileTab />
            <div className="flex  mx-auto">
      <div className="bg-gray-100 h-fit w-[800px] my-4 mx-2 rounded border border-gray-400 py-2">
        <div className="container mx-auto mt-10">
          <div className="flex justify-between mx-10 mb-3">
            <div>
              <p className="text-gray-600 mb-2">
                Order No:{" "}
                <span className="text-blue-600 mb-2">{orderDetails._id}</span>
              </p>
              <p className="text-gray-600 mb-4">
                Order On:{" "}
                <span className="text-gray-600 mb-2">
                  {orderDetails.updatedAt?.split(" ").slice(0, 5).join(" ")}
                </span>
              </p>
            </div>
            {/* <div>
              <p className="text-black mb-2 font-[500]">
                {orderDetails?.order_status === 1 ? "Placed" : "Canceled"}
              </p>
            </div> */}
          </div>
          <hr />
          {orderDetails && orderDetails.order_details
            ? orderDetails.order_details.map((orderD) => (
                <>
                  <div
                    className="grid grid-cols-8 mx-8 mt-10 mb-14"
                    key={orderD._id}
                  >
                    {" "}
                    <div className="flex col-span-5 gap-10 ms-5">
                      <div className="w-24">
                        <img src={imgBaseUrl + orderD.image} alt="" />
                      </div>
                      <div>
                        <div>{orderD?.name}</div>
                        <div>{orderD.colorData?.name}</div>
                        {/* <div>4/64</div> */}
                      </div>
                    </div>
                    <div className=" col-span-2 text-center">
                      <div className="text-gray-600 text-[14px] line-through">
                        ₹
                        {Number(
                          orderD.price.toFixed(2)?.replace(/[.,]00/, "")
                        ).toLocaleString("en-IN")}
                      </div>
                      <div className="text-gray-800 text-[14px]">
                        ₹
                        {Number(
                          orderD.finalPrice?.toFixed(2)?.replace(/[.,]00/, "")
                        ).toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="col-span-1 text-gray-800 text-[15px] text-end">
                      X {orderD.qty}
                    </div>{" "}
                  </div>
                  <hr />
                </>
              ))
            : null}
          <hr />
          {/* <div className="flex flex-row-reverse gap-40 mx-8 mt-10 mb-14">
            <div className="text-gray-600">
              <div className="text-end">{totalQty}</div>
              <div className="text-black text-end font-[500]">
                ₹ {orderDetails?.order_total}
              </div>
            </div>
            <div className="text-gray-600">
              <div className="">Quantity</div>
              <div className="">Total</div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="border leading-10 border-gray-400 ps-5 py-4 my-4 h-fit rounded mx-2 bg-gray-100 w-[400px]">
        <div className="font-bold text-[18px] ps-2">ORDER DETAILS</div>
        <div className="text-[17px] pe-5">
          <div className="flex justify-between px-2">
            <div>Status:</div>
            <div>
              {orderDetails?.order_status === 1 ? "Processing " : "Canceled"}
            </div>
          </div>
          <div className="flex justify-between px-2">
            <div>Subtotal:</div>
            <div>
              ₹
              {Number(
                totalCost?.toFixed(2)?.replace(/[.,]00/, "")
              ).toLocaleString("en-IN")}
            </div>
          </div>
          <div className="flex justify-between px-2">
            <div>Total Quantity:</div>
            <div>{totalQty} Items</div>
          </div>
          <div className="flex justify-between px-2">
            <div>Shipping Cost:</div>
            {orderDetails.shipping_cost === 0 ? (
              <div>FREE</div>
            ) : (
              <div>₹ {orderDetails.shipping_cost}</div>
            )}
          </div>
          <div className="flex justify-between px-2">
            <div>PromoCode:</div>
            {orderDetails.promoCode?.name === "" ? (
              <div></div>
            ) : (
              <div>{orderDetails.promoCode?.name}</div>
            )}
          </div>
          <div className=" px-2">Shipping:</div>
        </div>

        <div className="leading-8 text-sm ">
          <div className="flex gap-[180px] px-2 ">
            <div>Name:</div>
            <div className="text-left">{orderDetails.user_details?.name}</div>
          </div>
          <div className="flex gap-[122px] px-2">
            <div>Phone Number:</div>
            <div>{orderDetails.user_details?.mobile}</div>
          </div>
          <div className="flex gap-[166px] px-2">
            <div>Address:</div>
            <div>{orderDetails.user_details?.addrs}</div>
          </div>
          <div className="flex gap-[193px] px-2">
            <div>City:</div>
            <div>{orderDetails.user_details?.city}</div>
          </div>
          <div className="flex gap-[185px] px-2">
            <div>State:</div>
            <div>{orderDetails.user_details?.state}</div>
          </div>
          <div className="flex gap-[163px] px-2">
            <div>PinCode:</div>
            <div>{orderDetails.user_details?.pincode}</div>
          </div>
        </div>
        <div className="flex justify-between px-2 font-bold text-[18px] pe-7">
          <div>Total:</div>
          <div>
            ₹
            {Number(
              orderDetails?.order_total?.toFixed(2)?.replace(/[.,]00/, "")
            ).toLocaleString("en-IN")}
          </div>
        </div>
        <div className="flex justify-end mb-2 me-8">
          {orderDetails?.order_status === 1 ? (
            <button
              className="text-[13px] cursor-pointer mt-6 border border-gray-300 py-1 px-3"
              
            >
              Electronic Invoice
            </button>
          ) : null}
        </div>
      </div>
    </div>
           </div>
    );
}

export default Orders;
