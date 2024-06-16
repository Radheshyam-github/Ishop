import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeTocart, incToProduct,descToProduct } from '../../Reducers/Cart';
import {  useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart } = useSelector(Store => Store.cart);
  const { product, imgBaseUrl } = useSelector(Store => Store.product);
  const { user } = useSelector(Store => Store.user);
  const dispatch = useDispatch()
const navigate=useNavigate()
  const cartProducts = [];
  let total = 0;
  product.forEach(
    (prod) => {
      cart.forEach(
        (item) => {
          if (item.pId == prod._id) {
            cartProducts.push(
              {
                ...prod,
                qty: item.qty
              }
            )
            total += (prod.final * item.qty)
          }
        }
      )
    }
  );


  const deleteUserCart = (pId) => {
    if (user != null) {
      console.log(`http://localhost:5000/cart/delete/${user._id}/${pId}`);
      axios.delete(
        `http://localhost:5000/cart/delete/${user._id}/${pId}`

      )
        .then(
          (success) => {
            console.log(success)
          }
        ).catch(
          (error) => {
            console.log(error)
          }
        )
    }
  }

  const updateQty = (pId, qty) => {
    if (user != null) {
      axios.get(
        `http://localhost:5000/cart/update-qty/${user._id}/${pId}/${qty}`

      ).then(
        (success) => {
          console.log(success)
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    }
  }

  function checkOut() {
    if (user==null) {
      navigate("/loginwebsite")
    } else{
      navigate("/checkout")
    }
  }
  return (
    <>

      <div className=" bg-gray-100 pt-20 mt-4">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {
              cartProducts.map(
                (prod, i) => {
                  return (
                    <div key={i} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                      <img
                        src={imgBaseUrl + prod.image}
                        className="w-full rounded-lg sm:w-40"
                      />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {prod.name}
                          </h2>
                          <p className="mt-1 text-xs text-gray-700"><del>{prod.price}</del></p>
                          <p className="mt-1 text-xs text-gray-700">{prod.final}</p>
                          {/* <p className="mt-1 text-xs text-gray-700">{prod.discount} %off</p> */}

                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center border-gray-100">
                            <span

                              // onClick={() => {
                              //     updateQty(cat._id, cat.qty - 1);
                              //     dispatch(descToProduct({ pId: cat._id }))
                              // }
                              // }
                              onClick={() => {
                                if (prod?.qty === 1) {
                                  deleteUserCart(prod?._id);
                                  dispatch(removeTocart({ pId: prod?._id }));
                                } else {
                                  updateQty(prod?._id, parseInt(prod?.qty) - 1);
                                  dispatch(descToProduct({ pId: prod?._id }));
                                }
                              }}

                              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                              {" "}
                              -{" "}
                            </span>
                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={prod.qty} min={1}
                            />
                            <span

                              onClick={() => {
                                updateQty(prod._id, parseInt(prod.qty) + 1);
                                dispatch(incToProduct({ pId: prod._id }))
                              }}

                              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                              {" "}
                              +{" "}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <p className="text-sm">   {prod.final * prod.qty}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                              onClick={() => {
                                deleteUserCart(prod?._id);
                                dispatch(removeTocart({ pId: prod._id }))

                              }
                              }

                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              )
            }


          </div>
          {/* Sub total */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">{total}</p>
            </div>
            {/* <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div> */}
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">{total}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"  onClick={checkOut}>
              Check out
            </button>
          </div>
        </div>
      </div>
    </>

  );
}

export default Cart;
