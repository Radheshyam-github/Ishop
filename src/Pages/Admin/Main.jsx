import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Context } from '../../MainContext';
const Main = () => {
    return (
        <div className='grid grid-cols-5'>
            <div className=' '>
                < SideMenu />
            </div>
            <div className='col-span-4 '>
                <Header />
                <div className=' contact-chat h-[90vh]'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Main;


const Header = () => {
    // const { admin } = useContext(Context)
    // const navigate = useNavigate();
    // if (admin==null) {
    //     navigate("/admin/login");
    // }
    return (
        <>
            <div className='py-4 shadow'>
Header
            </div>
        </>
    );
}

const Footer = () => {
    return (
        <>
            <div className='py-4 shadow'  >

            </div>
        </>
    );
}



const SideMenu = () => {
    const menu = [
        {
            name: "Dashboard",
            url: "/admin",
            children: null
        },
        {
            name: "Category",
            url: null,
            children: [
                {
                    name: "Add",
                    url: "/admin/category/add"
                },
                {
                    name: "view",
                    url: "/admin/category"
                }

            ]
        },
        {
            name: "Product",
            url: null,
            children: [
                {
                    name: "Add",
                    url: "/admin/product/add"
                },
                {
                    name: "View",
                    url: "/admin/product"
                }
            ]
        },
        {
            name: "Color",
            url: null,
            children: [
                {
                    name: "Add",
                    url: "/admin/color/add"
                },
                {
                    name: "View",
                    url: "/admin/color"
                }
            ]
        },
        {
            name: "Users",
            url: "/admin/users",
            children: null
        }
    ]
    return (
        <>
            <div className='bg-[#111c43] h-[150vh] text-white p-2 sticky top-0'>
                <div className='text-center p-2 font-bold text-4xl '>
                    Admin Panel
                </div>
                <hr />
                <ul className='pl-3 mt-3'>
                    {
                        menu.map(
                            (item, index) => {
                                return <Sideitem key={index} item={item} />
                            }
                        )
                    }
                </ul>
            </div>
        </>
    );
}

const Sideitem = ({ item }) => {
    const [toggle, setToggle] = useState(false);
    return <>
        {
            item.children == null
                ?
                <Link>
                    <li className='my-2'> {item.name}</li>
                </Link>
                :
                <li className='my-2 cursor-pointer' onClick={() => setToggle(!toggle)}>

                    {item.name}
                    <ul className={`rounded-lg my-2 py-2 bg-white text-black duration-300 pl-4 ${toggle ? 'block' : 'hidden'}`}>
                        {
                            item.children.map(
                                (child, index) => {
                                    return (
                                        <Link key={index} to={child.url}>
                                            <li>{child.name}</li> 
                                        </Link>
                                    )
                                }
                            )
                        }
                    </ul>
                </li>
        }
    </>
}