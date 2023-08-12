import axios from 'axios';
// config
import { config } from '../configs';

// -----------------------------------------------

const axiosInstance = axios.create({
  baseURL: config.BASEURL,
  headers: {
    Secret: config.SECRET
  }
});



axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject((error?.response?.data) || { error: 400, message: 'Something went wrong' })
);

export default axiosInstance;
