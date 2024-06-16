import React, { useContext, useState } from 'react';
import { Context } from '../../MainContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { useDispatch, useSelector } from 'react-redux';
import { FaCartPlus } from "react-icons/fa";
import { addTocart } from '../../Reducers/Cart';
const Store = () => {
    const { color } = useContext(Context)
    const { cart } = useSelector(Store => Store.cart)
    const { category, catBaseUrl } = useSelector(Store => Store.category);
    const { product, imgBaseUrl } = useSelector(Store => Store.product);
    const [activecate, setActiveCate] = useState(undefined)
    const [activecolor, setActiveColor] = useState(undefined)
    // console.log(catBaseUrl)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const dispatch = useDispatch();
    const { slug } = useParams();
    let showproducts = product;
    const categoryData = category.filter(
        (cat) => {
            if (cat.slug === slug) {
                return true
            } else {
                return false
            }
        }
    )
    if (categoryData[0] !== undefined) {
        showproducts = product.filter(
            (prod) => {
                if (prod.category_id === categoryData[0]._id) {
                    return true;
                } else {
                    return false;
                }
            }
        )
    }
    // console.log(categoryData)
    // const [age, setAge] = React.useState('');
    // const Stropro = [
    //     {
    //         img: "images/appleipod.png",
    //         name: "Apple Ipod"
    //     },
    //     {
    //         img: "images/71fwbMm1NBL.png",
    //         name: "Apple Smartwatch 2"
    //     },
    //     {
    //         img: "images/AppleWatch.png",
    //         name: "Apple Smartwatch 2.0"
    //     },
    //     {
    //         img: "images/Applehomepod.png",
    //         name: "Apple homepod mini"
    //     },
    //     {
    //         img: "images/airpodsmax.png",
    //         name: "Apple Airpods Max"
    //     },
    //     {
    //         img: "images/designhero2x.png",
    //         name: "Apple Camera"
    //     },
    //     {
    //         img: "images/MQHX2.png",
    //         name: "iPhone Lightning Dock-Gold"
    //     },
    //     {
    //         img: "images/ELavtbuLSL.png",
    //         name: "Apple Magic Trackpad 2"
    //     },
    //     {
    //         img: "images/charger.png",
    //         name: "Apple Macbook Pro"
    //     },
    //     {
    //         img: "images/NewAppleMacMini.png",
    //         name: "New Apple Mac Mini"
    //     },
    //     {
    //         img: "images/AppleSmartwatch.png",
    //         name: "Apple Smartwatch Magic"
    //     },
    //     {
    //         img: "images/apple_airpods.png",
    //         name: "Apple Airpods"
    //     },
    //     // Add more products here
    // ];

    // const handleChange = (event) => {
    //     setAge(event.target.value); // Use event.target.value directly
    // };
    let displayproduct = product;
    if (activecate != undefined) {
        displayproduct = product.filter(
            (prod) => {
                if (prod.category_id == activecate) {
                    return true;
                } else {
                    return false;
                }
            }
        )
    }

    let displayColor = product;
    if (activecolor != undefined) {
        displayColor = product.filter(
            (color) => {
                if (color.color_id == activecolor) {
                    return true;
                } else {
                    return false
                }
            }
        )
    }

    return (

        <div>
            <div className="container-fulid bg-gray-100 py-2 mt-2  text-center font-semibold text-base leading-[17px]">
                Store/Accesories
            </div>


            <div className=' max-w-[1100px] mt-4  grid grid-cols-5 mx-auto gap-10'>
                <div className='w-full sm:w-1/3  '>
                    <div className='filter bg-gray-100 justify-center'>
                        <h3 className=' text-center pt-6 font-semibold text-base leading-[17px]'>CATEGORY</h3>
                        <ul className='list-unstyled pt-6 ps-4 font-semibold text-base leading-[17px]'>
                            <Link to={"/store"} >
                                <li onClick={() => setActiveCate(category._id)} className={`cursor-pointer pb-6 justify-between ${activecate == category._id ? 'text-blue-600  ' : ''} hover:text-[#33A0FF]`}>All ({product.length})</li>
                            </Link>
                            {
                                category.map(
                                    (cat, index) => {
                                        return (
                                            <Link key={index} to={`/store/${cat.slug}`}>
                                                <li onClick={() => setActiveCate(cat._id)} className={`cursor-pointer pb-6  ${activecate == cat._id ? 'text-blue-600  ' : ''} hover:text-[#33A0FF]`}> {cat.name}</li>
                                            </Link>
                                        )
                                    }
                                )
                            }
                        </ul>
                    </div>
                    {/* <div className='mt-8 col-span-4 bg-gray-100'>
                        <div className='font-bold pt-4 text-center'>
                            PRICES
                        </div>
                        <div className='flex gap-2 py-4 justify-center '>
                            <input type="number" className='shadow w-[80px]' placeholder='From' />
                            <span>-</span>
                            <input type="number" className='shadow w-[80px]' placeholder='To' />
                        </div>

                    </div> */}
                    <div className="mt-8 bg-gray-100 filter">
                        <div className="font-bold pt-4 text-center">Color</div>
                        <div className="flex flex-wrap font-semibold gap-2 py-4 ps-4">
                            <ul>
                                {
                                    color.map(
                                        (color, index) => {
                                            return <Link key={index} to={`/store/${category.slug}/${color.slug}`}>
                                                <li onClick={() => setActiveColor(color._id)} key={index} className={`cursor-pointer pb-6  py-2 w-full justify-between gap-20 flex ${activecolor == color._id ? 'text-blue-600  ' : ''} hover:text-[#33A0FF]`} >{color.name} <span className='rounded-full my-1 cursor-pointer ' style={
                                                    {

                                                        width: 15,
                                                        height: 15,
                                                        background: color.code,
                                                        display: "inline-block"
                                                    }
                                                }
                                                > </span></li>

                                            </Link>
                                        }
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    {/* </div>
                        <div className="mt-8 bg-gray-100">
                            <div className="font-bold text-center pt-2">BRAND</div>
                            <div>
                                <ul className="list-unstyled pt-4 ps-4 sm:pt-6 sm:ps-6 font-semibold text-base leading-[17px]">
                                    <li className="cursor-pointer">Apple</li>
                                    <li className="cursor-pointer pt-4">LG</li>
                                    <li className="cursor-pointer pt-4">Samsung</li>
                                    <li className="cursor-pointer py-4">Siemens</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 bg-gray-100">
                            <div className="font-bold text-center py-4">MORE</div>
                        </div> */}
                </div>
                <div className='col-span-4 '>
                    <div className='w-full'>
                        <Slider {...settings}>
                            {category.map((cat, index) => (
                                <div key={index} className='h-[340px] relative'>
                                    <img src={catBaseUrl + cat.image} className='h-full w-full' alt="" />
                                    <div className='absolute flex-col z-50 flex justify-center items-center inset-0 w-full h-full bg-black bg-opacity-50'>
                                        <h3 className='text-center text-4xl sm:text-5xl md:text-6xl text-white'>{cat.name}</h3>
                                        <Link to={`/store/${cat.slug}`} className='text-white border-b-2 mt-4 inline-block'>
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    {/* <div className=' mt-8 bg-gray-100  '>
                            <div className='py-2 flex gap-5'>
                                <h3>13 items</h3>
                                <button className=''>Short By</button>

                                <form fullWidth>
                                    <inputlabel id="demo-simple-select-label"></inputlabel>
                                    <select className='fouces-outline-none' labelId="demo-simple-select-label" id="framework" value={age} label="Age" onChange={handleChange}
                                    >
                                        <option value={10}>Phone</option>
                                        <option value={10}>Iphone</option>
                                        <option value={20}>Watch</option>
                                        <option value={30}>Ipad</option>
                                    </select>
                                </form>
                            </div>
                        </div> */}

                    <div className='mt-6 mx-auto w-full justify-center lg:justify-between  md:gap-[60px] gap-[40px] flex flex-wrap '>
                        {
                            showproducts.map(
                                (prot, index) => {
                                    return <Link key={index} to={`/store/product/${prot.slug}`}>
                                        <div className="   shadow-lg  sm:flex lg:justify-between gap-2 py-6 sm:flex-col sm:items-center ">
                                            <div className=''>
                                                <img src={imgBaseUrl + prot.image} className='px-6' width={200} alt="" />
                                                <h3 className='font-bold text-center pt-4'>{prot.name}</h3>
                                                <h3 className=' text-center py-2'>⭐⭐⭐⭐</h3>

                                                <h1 className='text-red-600  text-center'>${prot.final} <del>${prot.price}</del></h1>
                                            </div>
                                           
                                        </div>
                                    </Link>
                                }
                            )
                        }
                    </div>
                </div>

            </div>


        </div>
    );
}
export default Store;
