import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Context = createContext();
const MainContext = (props) => {

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const categoryBaseUrl = process.env.REACT_APP_CATEGORY_BASE_URL;
  const productBaseUrl = process.env.REACT_APP_PRODUCT_BASE_URL;
  const colorBaseUrl = process.env.REACT_APP_COLOR_BASE_URL;
  const adminBaseUrl = process.env.REACT_APP_ADMIN_BASE_URL;

  // console.log(apiBaseUrl);
  // console.log(categoryBaseUrl);

  const notify = (msg, type) => toast(msg, { type });

  const [category, setCategory] = useState([]);
  const [color,setColor]=useState([])  ;
  const [product,setProduct]=useState([]);
  const [proImgUrl, setProImgUrl] = useState(null);
  const [catImgUrl, setCatImgUrl] = useState(null);
  const [admin ,setAdmin]=useState(null);
  useEffect(
    () => {
      fetchCategory();
      fetchColor();
      fetchProduct();
    }, [0]
  )
  const fetchCategory = () => {
    axios.get(apiBaseUrl + categoryBaseUrl)
      .then(
        (success) => {
          if (success.data.status == 1) {
            setCategory(success.data.category)
            setCatImgUrl(success.data.baseUrl)
          
          } else {
            setCategory([])
          
          }
        }
      ).catch(
        (error) => {
          setCategory([])
       

        }
      )
  }
  const fetchColor = () => {
    axios.get(apiBaseUrl + colorBaseUrl)
      .then(
        (success) => {
          if (success.data.status == 1) {
            setColor(success.data.color)

          } else {
       
            setColor([])
          }
        }
      ).catch(
        (error) => {
          
          setColor([])

        }
      )
  }
  const fetchProduct = () => {
    // console.log(apiBaseUrl + productBaseUrl)
    axios.get(apiBaseUrl + productBaseUrl)
      .then(
        (success) => {
          if (success.data.status == 1) {
            setProduct(success.data.product)
            setProImgUrl(success.data.baseUrl)

          } else {
       
            setProduct([])
          }
        }
      ).catch(
        (error) => {
          
          setProduct([])

        }
      )
  }
  return (
    <Context.Provider value={{admin,setAdmin, adminBaseUrl,apiBaseUrl,proImgUrl, catImgUrl,productBaseUrl,productBaseUrl,setProduct, colorBaseUrl,categoryBaseUrl,setColor, notify,color, product,category,fetchColor, fetchCategory,fetchProduct }}>
      <ToastContainer />
      {props.children}
    </Context.Provider>
  );
}

export default MainContext;
export { Context };