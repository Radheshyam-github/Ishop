import React, { useEffect, useState } from 'react';
import ProfileTab from '../../Profile/ProfileTab';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from '../../Reducers/User';
const Profile = () => {
    const [localUser, setlocalUser] = useState({});
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    useEffect(
        () => {
            setlocalUser(user);

        }, [user]
    )
    const updateData = () => {
        axios.patch("http://localhost:5000/user/update-profile", localUser)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        alert(success.data.msg);
                        dispatch(login({ user: localUser }))
                    } else {
                        alert(success.data.msg);
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                    alert(error.data.msg);
                }
            )
    }
    return (
        <div className='max-w-[1200px] mx-auto'>
            <ProfileTab />

            <div className="mb-5">
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                    Your Name
                </label>
                <input
                    type="name"
                    id="name"
                    value={localUser?.name}
                    onChange={
                        (name) => {
                            setlocalUser(
                                {
                                    ...localUser,
                                    name: name.target.value
                                }
                            )
                        }
                    }
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    required=""
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                    Your Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={localUser?.email}

                    onChange={
                        (email) => {
                            setlocalUser(
                                {
                                    ...localUser,
                                    email: email.target.value
                                }
                            )
                        }
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"

                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="contact"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                    Your Contact
                </label>
                <input
                    type="text"
                    id="contact"
                    value={localUser?.contact}
                    onChange={
                        (contact) => {
                            setlocalUser(
                                {
                                    ...localUser,
                                    contact: contact.target.value
                                }
                            )
                        }
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                    Your Address
                </label>
                <textarea
                    onChange={
                        (address) => {
                            setlocalUser(
                                {
                                    ...localUser,
                                    address: address.target.value
                                }
                            )
                        }
                    }
                    name=" address" cols="15" rows="5" type="address"
                    id="address"
                    value={localUser?.address}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
            </div>
            <button
                type="button"
                onClick={updateData}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Update
            </button>


        </div>
    );
}

export default Profile;
