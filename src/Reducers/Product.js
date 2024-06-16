import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const getproducts = createAsyncThunk(
    "product/get-product",
    async () => {
        const response = await fetch("http://localhost:5000/product");
        const data = await response.json();
        if (data.status == 1) {
            return {
                product: data.product,
                baseUrl: data.baseUrl
            }
        } else {
            return {
                product: [],
                baseUrl: null
            }
        }

    }
)

const ProductSlice = createSlice(
    {
        name: "Product",
        initialState: {
            product: [],
            imgBaseUrl: null
        },
        reducers: {

        },
        extraReducers: (builder) => {
            builder.addCase(
                getproducts.fulfilled,
                (state, { payload }) => {
                    // console.log("payload", payload);
                    state.product=payload.product;
                    state.imgBaseUrl=payload.baseUrl;
                }
            )
            builder.addCase(
                getproducts.rejected,
                (state) => {
                    // console.log('rejected')
                    state.product = [];
                    state.imgBaseUrl = null;
                }
            )
        }
    }
)
export { getproducts };
export default ProductSlice.reducer;                       