const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const getDataFromls = createAsyncThunk(
    "cart/ls-data",
    () => {
        const lsCart = localStorage.getItem("cart");
        if (lsCart != undefined || lsCart != null) {
            return {
                cart: JSON.parse(lsCart)
            }
        } else {
            return {
                cart: []
            }
        }
    }
)
const CartSlice = createSlice(
    {
        name: "Cart",
        initialState: {
            cart: []
        },
        reducers: {
            emptyCart: (state) => {
                state.cart = [];
            },
            addTocart: (state, { payload }) => {
                let index = null;
                state.cart.forEach(
                    (item, i) => {
                        if (item.pId == payload.pId) {
                            index = i;
                        }
                    }
                )
                if (index == null) {
                    state.cart.push({ pId: payload.pId, qty: 1 });

                } else {

                    state.cart[index].qty = state.cart[index].qty + 1;
                }
                localStorage.setItem("cart", JSON.stringify(state.cart));
            },
            userCart: (state, { payload }) => {
                state.cart = payload.userCart;
            },
            removeTocart: (state, { payload }) => {
                state.cart = state.cart.filter(
                    (item) => {
                        if (item.pId == payload.pId) {
                            return false
                        } else {
                            return true
                        }
                    }
                )
                localStorage.setItem("cart", JSON.stringify(state.cart));
            },
            incToProduct: (state, { payload }) => {
                const { pId } = payload;
                // Find the index of the product in the cart
                const index = state.cart.findIndex(
                    (item) => item.pId === pId);
                if (index !== -1) {
                    // Increment the quantity of the product
                    state.cart[index].qty += 1;
                }
                // Update the cart in local storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
            },
            descToProduct: (state, { payload }) => {
                const { pId } = payload;
                // Find the index of the product in the cart
                const index = state.cart.findIndex((item) => item.pId === pId);
                if (index !== -1 && state.cart[index].qty > 1) {
                    // Decrease the quantity of the product (minimum 1)
                    state.cart[index].qty -= 1;
                }
                // Update the cart in local storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        extraReducers: (builder) => {
            builder.addCase(
                getDataFromls.fulfilled,
                (state, { payload }) => {
                    state.cart = payload.cart
                }
            )
        }
    }
)
export const { addTocart, removeTocart, incToProduct, descToProduct, emptyCart, userCart } = CartSlice.actions;
export { getDataFromls };
export default CartSlice.reducer;