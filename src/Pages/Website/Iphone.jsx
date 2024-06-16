import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// import { Context } from '../../MainContext';
const Iphone = () => {
    // const { product, imgBaseUrl,category } = useContext(Context);
    // const { category } = useSelector(Store => Store.category);
    const { product, imgBaseUrl } = useSelector(Store => Store.product);
    const { slug } = useParams();
    // console.log(slug)
    // let showproducts = product;
    // console.log(product)
    const productData = product.filter(
        (prod) => {
            if (prod.slug == slug) {
                return true
            } else {
                return false
            }
        }
    )

// console.log(productData)
    return (
        <div className='mt-10 mx-auto max-w-[1100px]'>
            <div className='mt-6 mx-auto w-full justify-center lg:justify-between  md:gap-[60px] gap-[40px] flex flex-wrap '>
            {
                productData.map(
                    (prodt, index) => {
                        return (
                            <div key={index} className=' shadow-lg truncate  relative group sm:flex lg:justify-between gap-2 py-6 sm:flex-col sm:items-center'   >

                                <div className='w-[200px]' >
                                    <img src={imgBaseUrl + "/" + prodt.image} className='px-10' alt="" />
                                </div>
                                <h3 className=' text-center'>{prodt.name}</h3>
                                <h3 className=' text-center'>⭐⭐⭐⭐</h3>
                                <h1 className='text-red-600  text-center'>${prodt.final} <del>${prodt.price}</del></h1>
                                <Link to={`/store/product/${prodt.slug}`}>
                                    <div className=' absolute top-[100%]  left-[55px] group-hover:top-[70%]   duration-300  left-130px'>
                                        <button type="button" className="text-white  bg-purple-700 hover:bg-purple-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 dark:bg-purple-400 dark:hover:bg-purple-700 dark:focus:ring-purple-700 ">
                                            Buy now
                                        </button>
                                    </div>
                                </Link>

                            </div>
                        )
                    }
                )
            }
        </div>
        </div >
    );
}

export default Iphone;
