import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        data:{}
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            console.log("vaibhav"+action.payload);
            state.user = action.payload;
        },
        setData:(state, action) => {
            console.log("vaibhav"+action.payload);
            state.data = action.payload;
        }
    }
});
export const {setLoading, setUser,setData} = authSlice.actions;
export default authSlice.reducer;