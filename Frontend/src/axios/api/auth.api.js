
import axiosInstance from "../axiosConfig";
async function login(email,password,userType) {//"User"
    try {
        const response = await axiosInstance.post("/auth/login", { email, password, userType });
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
}
async function register(email,password,userType,conformPassword) {//"User"
    try {
        const response = await axiosInstance.post("/auth/register", { email, password, userType ,conformPassword});
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
}


export  { login };