
import axiosInstance from "../axiosConfig";
async function  login(data) {
    try {
        if(data.googleId){
            const response = await axiosInstance.post("/auth/login", { googleId: data.googleId ,email:data.email,userType:data.userType});
            return response.data;
        }
        else{
            const response = await axiosInstance.post("/auth/login",{email:data.email,password:data.password,userType:data.userType});
            return response.data;
        }
    } catch (error) {
        return error.response.data;
    }
}
async function  register(data) {
    try {
        if(data.googleId){
            const response = await axiosInstance.post("/auth/register", { googleId: data.googleId ,email:data.email,userType:data.userType});
            return response.data;
        }
        else{
            const response = await axiosInstance.post("/auth/register",{email:data.email,password:data.password,userType:data.userType});
            return response.data;
        }
    }
catch(error){
    return error.response.data;}
}
async function  resetPassword(data) {
    try {
        const response = await axiosInstance.post("/auth/reset-password", { email: data.email ,newPassword:data.newPassword,isConformed:data.isConformed});
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export default {login,register,resetPassword};