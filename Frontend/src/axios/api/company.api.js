
import axiosInstance from "../axiosConfig";


 async function companyInfo(data) {
    try {
        const response = await axiosInstance.post("company/create", data);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data
        };
    }
}

async function companyMoreInfo(data) {
    try {
        const response = await axiosInstance.post("company/hr", data);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}

async function Logo(data) {
    try {
        const response = await axiosInstance.post("company/logo", data);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}
async function Exist() {
    try {
        const response = await axiosInstance.get("company/exist");
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}

async function UpdateCompanyProfile(companyData) {
    try {
        const response = await axiosInstance.put("company/update",companyData);
        return { success: true, data: response.data };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}
async function UpdateHrProfile(hrData) {
    try {
        const response = await axiosInstance.post("company/hr",hrData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}
async function UpdateLogo(logoFile) {
    try {
        const response = await axiosInstance.post("company/logo",logoFile);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}
export{UpdateHrProfile}
export{UpdateLogo};
export{UpdateCompanyProfile}
export{Exist};
export { companyMoreInfo };
export { Logo };


export { companyInfo };