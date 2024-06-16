
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../MainContext';
import axios from "axios";
import { useParams } from 'react-router-dom';

const Edit = () => {
  const { apiBaseUrl, categoryBaseUrl, notify } = useContext(Context);
  const [categoryData, setCategoryData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(apiBaseUrl + categoryBaseUrl + "/" + id)
      .then((success) => {
        if (success.data.status === 1) {
          setCategoryData(success.data.category);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [apiBaseUrl, categoryBaseUrl, id]);

  const generateSlug = (value) => {
    const slug = value.toLowerCase().replace(/ /g, '-');
    return slug;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("slug", event.target.slug.value);
    formData.append("image", event.target.image.files[0]);

    axios.patch(apiBaseUrl + categoryBaseUrl + "/edit/" + id, formData)
      .then((success) => {
        if (success.data.status === 1) {
          notify(success.data.msg, "success");
          event.target.reset();
        } else {
          notify(success.data.msg, "error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='shadow h-full p-4 my-5'>
      <div className='text-xl'>
        Category Edit
      </div>
      <hr className='mt-4' />

      <form onSubmit={submitHandler} encType='multipart/form-data'>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
          <input
            type="text"
            onChange={(e) => {
              setCategoryData({
                ...categoryData,
                name: e.target.value,
                slug: generateSlug(e.target.value),
              });
            }}
            value={categoryData.name}
            name='name'
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Slug</label>
          <input
            type="text"
            value={categoryData.slug}
            name='slug'
            readOnly
            id="slug"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Image</label>
          <input
            type="file"
            name='image'
            id="image"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Edit;

