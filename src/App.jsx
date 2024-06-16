import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WebsiteMain from './Pages/Website/Main';
import Home from './Pages/Website/Home';
import Store from './Pages/Website/Store';
import AdminMain from './Pages/Admin/Main';
import Dashboard from "./Pages/Admin/Dashboard";
import CategoryAdd from "./Pages/Admin/Category/Add";
import CategoryView from "./Pages/Admin/Category/View";
import CategoryEdit from "./Pages/Admin/Category/Edit"
import ColorEdit from "./Pages/Admin/Color/Edit"
import ColorAdd from "./Pages/Admin/Color/Add"
import ColorView from "./Pages/Admin/Color/View"
import ProductAdd from "./Pages/Admin/Product/Add"
import ProductEdit from "./Pages/Admin/Product/Edit"
import ProductView from "./Pages/Admin/Product/View"
import Productpage from './Pages/Website/Productpage';
import Cart from './Components/Website/Cart';
import Login from './Pages/Admin/Login';
import Iphone from './Pages/Website/Iphone';
import Ipad from './Pages/Website/Ipad';
import { getCategories } from './Reducers/Category';
import { getproducts } from './Reducers/Product';
import { getDataFromls } from './Reducers/Cart';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LoginWebSite from './Pages/Website/LoginWebSite';
import SignupWebSite from './Pages/Website/SignupWebSite';
import { getuserDataFromls } from './Reducers/User';
import CheckOut from './Components/Website/CheckOut';
import OrderSuccess from './Pages/Website/OrderSuccess';
import ProfileTab from './Profile/ProfileTab';
import Profile from './Components/Website/Profile';
import ChangePassword from './Components/Website/ChangePassword';
import Orders from './Components/Website/Orders';
function App() {
  const dispatch = useDispatch()
  useEffect(
    () => {
      dispatch(getCategories())
      dispatch(getproducts())
      dispatch(getDataFromls())
      dispatch(getuserDataFromls())
    }, []
  )


  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <WebsiteMain />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "Store/:slug?",
            element: <Store />
          },
          {
            path: "Iphone/:slug?",
            element: <Iphone />
          },
          {
            path: "Ipad",
            element: <Ipad />
          },
          {
            path: "Store/product/:product_slug",
            element: <Productpage />
          },
          {
            path: "cart",
            element: <Cart />
          },
          {
            path:"checkout",
            element:<CheckOut/>
          },
          {
            path:"order-success/:order_id",
            element:<OrderSuccess/>
          },
          {
            path:"profiletab",
            element:<ProfileTab/>
          },
          {
            path:"profile",
            children:[
              {
                path:"",
                element:<Profile/>
              },
              {
                path:"my-Orders",
                element:<Orders/>
              },
              {
                path:"change-password",
                element:<ChangePassword/>
              }
    
            ]
          }
        ]
      },
      {
        path: "/loginwebsite",
        element: <LoginWebSite />
      },
      
      {
        path:"/signup",
        element:<SignupWebSite/>
      },
      {
        path: "/admin",
        element: <AdminMain />,
        children: [
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: "category/add",
            element: <CategoryAdd />
          },
          {
            path: "category",
            element: <CategoryView />
          }
          ,
          {
            path: "category/edit/:id",
            element: <CategoryEdit />
          }
          ,
          {
            path: "product/add",
            element: <ProductAdd />
          },
          {
            path: "product",
            element: <ProductView />
          }
          ,
          {
            path: "product/edit/:id",
            element: <ProductEdit />
          },
          {
            path: "color/add",
            element: <ColorAdd />
          },
          {
            path: "color",
            element: <ColorView />
          },
          {
            path: "color/edit/:id",
            element: <ColorEdit />
          }
        ]
      },
      {
        path: "/admin/login",
        element: <Login />
      }
    ]
  )
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
