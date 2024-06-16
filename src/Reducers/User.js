const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const getuserDataFromls = createAsyncThunk(
    "user/ls-data",
    () => {
        const lsuser = localStorage.getItem("user");
        if (lsuser != undefined || lsuser != null) {
            return {
                user: JSON.parse(lsuser)
            }
        } else {
            return {
                user: null
            }
        }
    }
)
const UserSlice = createSlice(
    {
        name: "User",
        initialState: {
            user: null
        },
        reducers: {
            login: (state, { payload }) => {
                state.user = payload.user;
                localStorage.setItem("user", JSON.stringify(payload.user));
            },
            logout:(state)=>{
                state.user=null;
                    localStorage.removeItem("user");
                    // localStorage.removeItem("cart");
            }

        },
        extraReducers: (builder) => {
            builder.addCase(
                getuserDataFromls.fulfilled,
                (state, { payload }) => {
                    state.user = payload.user
                }
            )
        }
    }
)
export const {login,logout } = UserSlice.actions;
export { getuserDataFromls };
export default UserSlice.reducer;