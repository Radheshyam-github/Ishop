import React, { useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import Helps from '../../Components/Website/Helps';
import { FaCartPlus } from "react-icons/fa";
// import Slider from '../../Components/Website/Slider';
// import { Context } from '../../MainContext';
// import Productbox from '../../Components/Website/Productbox';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addTocart } from '../../Reducers/Cart';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    // const { category, product, proBaseUrl } = useContext(Context);
    const { category } = useSelector(Store => Store.category);
    const { product, imgBaseUrl } = useSelector(Store => Store.product);
    const [activecate, setActiveCate] = useState(undefined)

    const dispatch = useDispatch()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };


    const helpsData = [
        {
            img: "images/refund.svg",
            title: 'FREE SHIPPING',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
        },
        {
            img: "images/shipping.svg",
            title: '100% REFUND',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
        },
        {
            img: "images/support.svg",
            title: 'SUPPORT 24/7',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
        },
        // Add more help items as needed
    ];
    const sliderimage = [
        {
            img: "images/beatssolo.png",
            title: 'Beats 2 On Ear Headphones',

        },
        {
            img: "images/Hsquared.png",
            title: 'H-Squared tvTray',

        },
        {
            img: "images/Netatmorain.png",
            title: 'Netatmo Rain Gauge',

        },
        {
            img: "images/beatssolo.png",
            title: 'Beats 2 On Ear Headphones',

        },
        {
            img: "images/Hsquared.png",
            title: 'H-Squared tvTray',

        },
        {
            img: "images/Netatmorain.png",
            title: 'Netatmo Rain Gauge',

        }
        // Add more help items as needed
    ];
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
    const { slug } = useParams();
    // let showProduct = product;

    const categoryData = category.filter((cat) => {
        if (cat.slug == slug) {
          return true;
        } else {
          return false;
        }
      });
      if (categoryData[0] !== undefined) {
        displayproduct = product.filter((p) => {
          if (p.category_id == categoryData[0]._id) {
            return true;
          } else {
            return false;
          }
        });
      }


    return (
        <>
            {/* ... your banner and menu code ... */}
            <div className='w-full h-[650px]  banner1 relative mt-5  '>
                <img src="images/2_corousel.png" alt="" className='absolute right-[0] bottom-[0]' />
            </div>
            <div className="container text-center justify-center sm:text-1xl text-2xl font-bold !mt-[40px]">
                <span> BEST SELLER</span>
            </div>
            <ul className='font-bold md:flex justify-center  text-base hidden gap-[10px] my-5'>
                <li onClick={() => setActiveCate(category._id)} className={`cursor-pointer ${activecate == category._id ? 'text-blue-600 border-b-2 border-blue-600' : ''} hover:text-[#33A0FF]`} >All </li>
                {

                    category.map(
                        (cat, i) => {
                            return <li onClick={() => setActiveCate(cat._id)} key={i} className={`cursor-pointer ${activecate == cat._id ? 'text-blue-600 border-b-2 border-blue-600' : ''} hover:text-[#33A0FF]`}>{cat.name} </li>

                        }
                    )
                }

            </ul>
            <hr />
            {/* resposive product page  */}


            <div className='items-center px-4 mb-4 md:hidden'>
                <select id="countries" class="bg-gray-50 text-center  border mt-6  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {/* <option selected>Choose a Category</option> */}
                    <option onClick={() => setActiveCate(category._id)} className={`cursor-pointer ${activecate == category._id ? 'text-blue-600 border-b-2 border-blue-600' : ''} hover:text-[#33A0FF]`} >All </option>
                    {

                        category.map(
                            (cat, i) => {
                                return (
                                    <> 
                                        { 
                                        cat.status && (
                                            <option  value={cat.slug} key={i}>
                                                {cat.name}
                                            </option>
                                        )
                                        }
                                        {/* <option onSubmit={() => setActiveCate(category._id)} key={i} className={`cursor-pointer ${activecate == cat._id ? 'text-blue-600  border-blue-600' : ''} hover:text-[#33A0FF]`}>{cat.name} </option> */}
                                    </>
                                )
                                // <option onSubmit={() => setActiveCate(category._id)} key={i} className={`cursor-pointer ${activecate == cat._id ? 'text-blue-600  border-blue-600' : ''} hover:text-[#33A0FF]`}>{cat.name} </option>

                            }
                        )
                    }

                    {/* <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option> */}
                </select>
            </div>
            <hr />
            {/* BESSETSELLER Product Page */}
            <div className="container mx-auto  pt-4 w-full justify-center lg:justify-between  md:gap-[60px] gap-[40px] flex flex-wrap ">

                {
                    displayproduct.map(
                        (prodt, index) => {
                            return (
                                <div key={index} className=' shadow-lg truncate  relative group sm:flex lg:justify-between gap-2 py-8 sm:flex-col sm:items-center'   >

                                    <div className='w-[200px]' >
                                        <img src={imgBaseUrl + "/" + prodt.image} className='px-10' alt="" />
                                    </div>
                                    <h3 className=' text-center'>{prodt.name}</h3>
                                    <h3 className=' text-center'>⭐⭐⭐⭐</h3>
                                    <h1 className='text-red-600  text-center'>${prodt.final} <del>${prodt.price}</del></h1>
                                    <Link to={`/Store/product/${prodt.slug}`}>
                                        <div className=' absolute top-[100%]  left-[55px] group-hover:top-[70%]   duration-300  left-130px'>
                                            <button type="button" className="text-white  bg-purple-700 hover:bg-purple-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 dark:bg-purple-400 dark:hover:bg-purple-700 dark:focus:ring-purple-700 ">
                                                Buy now
                                            </button>
                                        </div>
                                    </Link>
                                    <div className='absolute hidden group-hover:block bg-[#1fc0a0] top-[0%] right-[5%] 
                                      rounded-full    duration-300 left-130px
                                    '>
                                        <button onClick={() => dispatch(addTocart({ pId: prodt._id }))} className='p-2 rounded-full  hover:bg-blue-600'>
                                            <FaCartPlus />
                                        </button>
                                    </div>

                                    <div className='absolute top-[5%] rotate-[-35deg]  left-[0%]  '>
                                        <button className='bg-red-600 px-1 text-white' >
                                            {prodt.discount}% OFF
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>

            {/* resposive product page  */}


            <div className="container text-center py-14 ">
                <span className=' text-indigo-700 font-bold border-solid border-b-4 border-indigo-700 '>LOAD MORE</span>
            </div>
            {/* ... your banner code ... */}
            <div className="mt-20  md:mt-10 w-full h-[600px] flex flex-wrap relative banner2">
                <div className='text-white md:ms-32   mt-12  absolute'>
                    <h1 className='text-4xl md:text-6xl sm:mt-2 text-center'>iphone 6 plus</h1>
                    <p className='font-proxima pt-4 text-2xl md:text-3xl text-center md:text-left'>
                        Performance and design. Taken <br /> right to the edge.
                    </p>
                    <div className="container pt-6 text-center md:text-left">
                        <span className='text-white-700 font-bold border-solid border-b-4 border-white-700'>
                            SHOP NOW
                        </span>
                    </div>
                </div>

                <div className=''>
                    <img src="images/iphone_6_plus.png" className='absolute right-[0] bottom-[0]' alt="" />
                </div>
            </div>

            <div className="container justify-center lg:justify-between text-center lg:w-auto flex flex-wrap  font-proxima-nova text-base leading-6">


                {
                    helpsData.map(
                        (help, index) => (
                            <Helps key={index} title={help.title} img={help.img} description={help.description}
                            />
                        )
                    )
                }

            </div>
            {/* Add the Slider component here */}
            <div className="container text-center mx-auto ">
                <h4 className='font-bold  my-10'>FEATURED PRODUCTS</h4>
            </div>
            {/* <div className="container justify-center lg:justify-between gap-[20px]  ">

                <Slider {...settings}>

                    {
                        sliderimage.map(
                            (slider, index) => (
                                <div key={index} className=' '>
                                    <div className='flex'>
                                        <div className=''>
                                            <img src={slider.img} alt="" />
                                        </div>
                                        <div className=''>
                                            <h1 className='font-bold '>{slider.title}</h1>
                                            <h1>⭐⭐⭐⭐</h1>
                                        </div>
                                    </div>
                                </div>
                                // <Slider key={index} title={slider.title} img={slider.img} />
                            )
                        )
                    }
                </Slider>


            </div> */}
            {/* ... your remaining code ... */}

        </>
    );
};

export default Home;
