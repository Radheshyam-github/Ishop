import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../MainContext';

import axios from "axios"
import { useParams } from 'react-router-dom';
const Edit = () => {
  const { apiBaseUrl, productBaseUrl, notify, category, color } = useContext(Context);
  const slugRef = useRef();
  const priceRef = useRef();
  const discRef = useRef();
  const [productdata, setProductData] = useState({});


  function calprice() {
    const price = priceRef.current.value;
    const disc = discRef.current.value;
    if (price != "" && disc != "") {
      const final = price - price * (disc / 100);
     return final;
    }
  }
  const { id } = useParams();
  useEffect(
    () => {
      axios.get(apiBaseUrl + productBaseUrl + "/" + id)
        .then(
          (success) => {
            if (success.data.status == 1) {
              setProductData(success.data.product);
            } 
            else {
              setProductData([]);
            }
          }
        )
        .catch((error) => {
          console.error(error);
        });
    }
    ,[apiBaseUrl,productBaseUrl,id]
  );

  const generateSlug = (value) => {
    const slug = value.toLowerCase().replace(/ /g, '-');
    return slug;
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("slug", event.target.slug.value);
    formData.append("category_id", event.target.category.value);
    formData.append("color_id", event.target.color.value);
    formData.append("price", event.target.price.value);
    formData.append("discount", event.target.discount.value);
    formData.append("final", event.target.final.value);

    formData.append("image", event.target.image.files[0]);

    axios.patch(apiBaseUrl + productBaseUrl + "/edit/"+ id, formData)

      .then(
        (success) => {
          if (success.data.status == 1) {
            notify(success.data.msg, "success");
            event.target.reset();
          } else {
            notify(success.data.msg, "error");
          }
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
  }
  return (
    <div className='shadow h-full p-4 my-5'>
      <div className='text-xl font-bold'>
        Product  Edit
      </div>
      <hr className='mt-4' />

      <form onSubmit={submitHandler} encType='multipart/form-data'>
        <div className="grid grid-cols-2 gap-5">
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
            <input type="text" onChange={
              (e) => {
                setProductData(
                  {
                    ...productdata,
                    name: e.target.value,
                    slug: generateSlug(e.target.value)
                  }
                )
              }
            } value={productdata.name} name="name" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <div className="mb-6">
            <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Slug</label>
            <input type="text" value={productdata.slug} name='slug' ref={slugRef} readOnly id="slug" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="mb-6">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category</label>
            <select value={productdata.category_id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" name="category" id="category" onChange={
              (e)=>{
                setProductData(
                  {
                    ...productdata,
                    category_id:e.target.value
                  }
                )
              }
            } >
              <option disabled selected> Select a Categroy</option>
              {
                category.map(
                  (cat) => {
                    return <option value={cat._id} key={cat._id}>{cat.name}</option>
                  }
                )
              }
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Color</label>
            <select value={productdata.color_id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" name="color"
            onChange={
              (e) => {
                setProductData(
                  {
                    ...productdata,
                   color_id:e.target.value
                  }
                )
              }
            }
            id="color" >
              <option disabled selected> select a Color</option>
              {
                color.map(
                  (color) => {
                    return <option value={color._id} key={color._id}>{color.name}</option>
                  }
                )
              }
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="mb-6">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Price</label>
            <input type="text" name='price' id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" ref={priceRef}
            onChange={
              (e) => {
                setProductData(
                  {
                    ...productdata,
                   price:e.target.value,
                   final:calprice()
                  }
                )
              }
            }
            value={productdata.price} required />
          </div>
          <div className="mb-6">
            <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Discount</label>
            <input type="text" name='discount' id="discount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  ref={discRef}
             onChange={
              (e) => {
                setProductData(
                  {
                    ...productdata,
                   discount:e.target.value,
                   final:calprice()
                  }
                )
              }
            }
            value={productdata.discount} required />
          </div><div className="mb-6">
            <label htmlFor="final" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Final</label>
            <input type="text" name='final' readOnly id="final" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"      value={productdata.final} required />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Image</label>
          <input type="file" name='image' id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
      </form>

    </div>
  );
}

export default Edit;
