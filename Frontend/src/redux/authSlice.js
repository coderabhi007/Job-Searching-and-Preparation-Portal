import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        data:{},
        companyData:{},
        hrData:{},
        logoFile:null
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            //console.log("vaibhav"+action.payload);
            state.user = action.payload;
        },
        setData:(state, action) => {
           // console.log("vaibhav"+action.payload);
            state.data = action.payload;
        },
        setCompanyData:(state, action) => {
            //console.log("vaibhav"+action.payload);
            state.companyData = action.payload;
        },
        setHrData:(state, action) => {
            //console.log("vaibhav"+action.payload);
            state.hrData = action.payload;
        },
        setLogoFile:(state, action) => {
           // console.log("vaibhav"+action.payload);
            state.logoFile = action.payload;
        }
    }
});
export const {setLoading, setUser,setData,setCompanyData,setHrData,setLogoFile} = authSlice.actions;
export default authSlice.reducer;