import axiosInstance from "../axiosConfig";
 
async function  sendOtp(email) {
    try {
        const response = await axiosInstance.post('/send-otp', { email });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}
async function  verifyOtp(email,otp) {
    try {
        const response = await axiosInstance.post('/verify-otp', { email, otp });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}
export  {sendOtp,verifyOtp};