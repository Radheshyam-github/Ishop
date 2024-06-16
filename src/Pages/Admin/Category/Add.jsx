import React, { useContext, useRef } from 'react';
import { Context } from '../../../MainContext';
import axios from "axios"
const Add = () => {
  const { apiBaseUrl, categoryBaseUrl, notify } = useContext(Context);
  const slugRef = useRef();
  const generateSlug = (event) => {
    const slug = event.target.value.toLowerCase().replace(/ /g, '-');
    slugRef.current.value = slug;
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("slug", event.target.slug.value);
    formData.append("image", event.target.image.files[0]);

    axios.post(apiBaseUrl + categoryBaseUrl + "/create", formData)

      .then(
        (success) => {
          // console.log(success)
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
    <div className='shadow   h-full p-4 my-5'>
      <div className='text-xl font-bold'>
        Category Add
      </div>
      <hr className='mt-4' />

      <form onSubmit={submitHandler} encType='multipart/form-data'>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
          <input type="text" name='name' onChange={generateSlug} id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </div>
        <div className="mb-6">
          <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Slug</label>
          <input type="text" name='slug' ref={slugRef} readOnly id="slug" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
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

export default Add;
