import React, { useContext, useEffect } from 'react';
import { Context } from '../../../MainContext';
import axios from 'axios';
 import { Link } from 'react-router-dom';
const View = () => {
    const { category, fetchCategory, catImgUrl, notify } = useContext(Context)

    useEffect(
        () => {
            fetchCategory();
        }, []
    )
    function changeStatus(id, newStatus) {
        axios.patch(`http://localhost:5000/category/change-status/${id}/${newStatus}`)
            .then(
                (success) => {
                    // console.log(success.data)
                    if (success.data.status == 1) {
                        fetchCategory();
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
        axios.delete(`http://localhost:5000/category/delete/${id}`)
            .then(
                (success) => {
                    // console.log(success.data)
                    if (success.data.status == 1) {
                        fetchCategory();
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
                    Category Add
                </div>
                <hr className='mt-4' />

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700  bg-gray-50  dark:text-gray-700">
                            <tr >
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Slug
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                category.map(
                                    (cat) => {
                                        return <tr key={cat._id} className="bg-white border-b border-t dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark">
                                                {cat.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {cat.slug}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img width={100} src={catImgUrl + cat.image} alt="" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={
                                                    (e) => {
                                                        changeStatus(cat._id, !cat.status)
                                                        e.target.innerText = "Loading..."
                                                    }
                                                } className={`btn text-white p-2 ${cat.status ? 'bg-blue-400' : 'bg-orange-400'}`}>
                                                    {cat.status ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => deleteData(cat._id)} className='p-2 bg-red-500 text-white'>Delete</button>
                                             <Link to={"/admin/category/edit/"+cat._id} >
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
