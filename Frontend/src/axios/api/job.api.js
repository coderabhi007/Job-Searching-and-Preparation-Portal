import axiosInstance from "../axiosConfig";
async function Allposts() {
    try {
        const response = await axiosInstance.get(`/job/getAllPost`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}
export {Allposts}