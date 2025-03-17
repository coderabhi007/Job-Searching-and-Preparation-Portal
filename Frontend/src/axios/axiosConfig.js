import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8001/api/v1/",
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;