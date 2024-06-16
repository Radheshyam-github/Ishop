
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { login } from '../Reducers/User';

const Login = () => {
    // const { apiBaseUrl, adminBaseUrl, notify } = useContext(Context);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState(false);
    const navigate=useNavigate()
    const loginUser = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        if (password != "" && email != "") {
            axios.post(
                "http://localhost:5000/user/login", { email, password }
            ).then(
                (success) => {
                  
                    if (success.data.status == 1) {
                        setError(false);
                        setMsg(success.data.msg);
                       
                        event.target.reset();
                        navigate("/")
                    }else{
                        setError(true);
                        setMsg(success.data.msg);
                    }
                }
            )
            .catch(
                () => [

                ]
            )
        } else {
            setError(true);
            setMsg("Please fill all the feilds");
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900  md:h-screen pt-6">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className={` text-center text-2xl ${error ? 'text-red-500' : 'text-green-500'}`}>
                                {msg}
                            </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={loginUser}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input name="password" id="password" placeholder="••••••••" type="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blu dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <Link to="/signup"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Sign up
                                    
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    );
}

export default Login;
