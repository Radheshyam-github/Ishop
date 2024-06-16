import React from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderSuccess = () => {
    const {order_id}=useParams();
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-md rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto mb-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18a8 8 0 100-16 8 8 0 000 16z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M15 7a1 1 0 00-1.707-.707L10 10.586 6.707 7.293a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00.293-.707z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Order Placed Successfully!
          </h2>
          <h2>Order ID : {order_id} </h2>
          <p className="text-gray-600">
            Thank you for your order. We've received your request and will process
            it shortly.
          </p>
          Go To My<Link to={"/profile/my-Orders"}> Orders </Link>
        </div>
      </div>
    );
}

export default OrderSuccess;

