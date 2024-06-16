import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Context } from '../../MainContext';
const Ipad = () => {
    // const { product, proBaseUrl } = useContext(Context)
    const { product, imgBaseUrl } = useSelector(Store => Store.product);
    return (
       <div className='mt-10 mx-auto max-w-[1100px]'>
         <div className='mt-6 mx-auto w-full justify-center lg:justify-between  md:gap-[60px] gap-[40px] flex flex-wrap '>
            {
                product.map(
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
    );
}

export default Ipad;
