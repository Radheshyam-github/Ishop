import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const getCategories = createAsyncThunk(
    "category/get-category",
    async () => {
        const response = await fetch("http://localhost:5000/category");
        const data = await response.json();
        
        if (data.status == 1) {
            return {
                category: data.category,
                baseUrl: data.baseUrl
                
            }
            
        } else {
            return {
                category: [],
                baseUrl: null
            }
        }

    }
)

const CategorySlice = createSlice(
    {
        name: "Category",
        initialState: {
            category: [],
            catBaseUrl: null
        },
        reducers: {

        },
        extraReducers: (builder) => {
            builder.addCase(
                getCategories.fulfilled,
                (state, { payload }) => {
                    // console.log("payload", payload);
                    state.category=payload.category;
                    state.catBaseUrl=payload.baseUrl;
                }
            )
            builder.addCase(
                getCategories.rejected,
                (state) => {
                    // console.log('rejected')
                    state.category = [];
                    state.catBaseUrl = null;
                }
            )
        }
    }
)
export { getCategories };
export default CategorySlice.reducer;                       