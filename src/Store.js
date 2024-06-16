import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./Reducers/Category";
import ProdutReducer from "./Reducers/Product"
import CartReducer from "./Reducers/Cart"
import  UserReducer  from "./Reducers/User";

const Store = configureStore(
  {
    reducer: {
      category: CategoryReducer,
      product: ProdutReducer,
      cart: CartReducer,
      user:UserReducer
    }
  }
);
export default Store;