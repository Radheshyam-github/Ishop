import { useEffect ,React,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTocart, emptyCart } from '../../Reducers/Cart';
import axios from 'axios';

import { useNavigate,Link } from 'react-router-dom';
import useRazorpay from "react-razorpay";
// import { Context } from '../../MainContext';

const Productpage = () => {
    // const { product, imgBaseUrl } = useContext(Context)
    const { cart } = useSelector(store => store.cart);
    const { product_slug, category } = useParams();
    const { user } = useSelector(Store => Store.user);
    const [userData, setUserData] = useState({});
    const { product, imgBaseUrl } = useSelector(Store => Store.product);
const navigate=useNavigate()
    const navgiate = useNavigate();
    const productDetails = product.filter(
        (prod) => prod.slug == product_slug
    )
    const [Razorpay] = useRazorpay();

    const dispatch = useDispatch()

    useEffect(
        () => {
            setUserData(user)
        }, [user]
    )


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

    function placeOrder() {
        axios.post(
            "http://localhost:5000/order/place-order",
            {
                user_details: userData,
                order_details: cartProducts,
                user_id: user._id,
                order_total: total
            }
        )
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        razorPayPayment(success.data.order, success.data.razorOrder)
                        return true;
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
    }
    function checkOut() {
        if (user==null) {
          navigate("/loginwebsite")
        } else{
          navigate("/checkout")
        }
      }
    function razorPayPayment(order, razorOrder) {
        const options = {
            key: "rzp_test_wECOiVNawyQpzg", // Enter the Key ID generated from the Dashboard
            amount: razorOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Ishop ",
            description: "",
            image: "https://www.ishop-worldwide.com/wp-content/uploads/2022/10/iShop_Logo22_1380x430.png",
            order_id: razorOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                //   alert(response.razorpay_payment_id);
                //   alert(response.razorpay_order_id);
                //   alert(response.razorpay_signature);
                axios.post(
                    "http://localhost:5000/order/order-success",
                    {
                        order,
                        razorOrder,
                        response
                    }
                )
                    .then(
                        (success) => {
                            if (success.data.status == 1) {
                                // dispatch(emptyCart())
                                // console.log("hy")
                                navgiate(`/order-success/${order._id}`)
                            }
                        }
                    )
                    .catch(
                        (error) => {
                            console.log(error)
                        }
                    )
            },
            prefill: {
                name: order.user_details.name,
                email: order.user_details.email,
                contact: order.user_details.contact,
            },
            theme: {
                color: "#2699fb",
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();
    }
    //console.log(productDetails)
    return (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
                <div className=" mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded  border-gray-200" src={imgBaseUrl + "/" + productDetails[0].image} width={"300px"}
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                            {productDetails[0].name}
                        </h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <span className="text-gray-600 ml-3">4 Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24"
                                    >
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24"
                                    >
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24"
                                    >
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                    </svg>
                                </a>
                            </span>
                        </div>
                        {/* <p className="leading-relaxed">
                            Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                            sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps
                            cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine
                            tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean
                            shorts keytar banjo tattooed umami cardigan.
                        </p> */}
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                            <div className="flex">
                                <span className="mr-3">Color</span>
                                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                                <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none" />
                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                        <option>SM</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <h1 className='text-red-600  text-center'>${productDetails[0].final} <del>${productDetails[0].price}</del></h1>
                            <button
                                onClick={() => dispatch(addTocart({ pId: productDetails[0]._id }))} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                                Add To Cart
                            </button>
                            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                <svg
                                    fill="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                </svg>
                            </button>
                            
                            <button onClick={checkOut} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                                Order
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Productpage;
