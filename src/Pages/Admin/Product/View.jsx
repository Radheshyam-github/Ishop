import React, { useContext, useEffect } from 'react';
import { Context } from '../../../MainContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
const View = () => {
    const { product, fetchProduct, proImgUrl, notify } = useContext(Context)


    useEffect(
        () => {
            fetchProduct();
        }, []
    )
    function changeSeller(id, newSeller) {
        axios.patch(`http://localhost:5000/product/best-seller/${id}/${newSeller}`)
            .then(
                (success) => {
                    // console.log(success.data)
                    if (success.data.best_seller == 1) {
                        fetchProduct();
                        notify(success.data.msg, "success")
                    } else {
                        notify(success.data.msg, "error")
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
    }
    function deleteData(id) {
        axios.delete(`http://localhost:5000/product/delete/${id}`)
            .then(
                (success) => {
                    // console.log(success.data)
                    if (success.data.status == 1) {
                        fetchProduct();
                        notify(success.data.msg, "success")
                    } else {
                        notify(success.data.msg, "error")
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                    notify("Internal server error", "error")
                }
            )
    }
    return (
        <div>
            <div className='shadow h-full p-4 my-5'>
                <div className='text-xl'>
                    Product View
                </div>
                <hr className='mt-4' />

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700  bg-gray-50  dark:text-gray-700">
                            <tr >
                                <th scope="col" className="px-6 py-3">
                                    Product  Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Slug
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Best Seller
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product  Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map(
                                    (pro) => {
                                        return <tr key={pro._id} className="bg-white border-b border-t dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark">
                                                {pro.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {pro.slug}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img width={100} src={proImgUrl + pro.image} alt="" />
                                            </td>

                                            <td className="px-6 py-4">
                                                <del>$  {pro.price}</del> <br />
                                                {pro.discount}% off <br />
                                                ${pro.final}
                                            </td>

                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={
                                                        () => {
                                                            changeSeller(pro._id, !pro.best_seller)
                                                            // e.target.innerText = "Loading..."
                                                        }
                                                    }
                                                    className={`p-2 ms-4  text-white ${pro.best_seller ? 'bg-blue-400' : 'bg-orange-400'}`}> 
                                                    {pro.best_seller ? 'YES' : 'NO'}
                                                    </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => deleteData(pro._id)} className='p-2 bg-red-500 text-white'>Delete</button>
                                                <Link to={"/admin/product/edit/" + pro._id} >
                                                    <button className='p-2 ms-4 bg-green-500 text-white'>Edit</button>
                                                </Link>
                                            </td>
                                        </tr>


                                    }
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default View;
