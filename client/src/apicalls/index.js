import axios from 'axios'
import { showToast } from '../store/toastSlice';
import { clearUser } from '../store/userSlice';

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`,
    withCredentials:true,
    headers:{
        "Content-type": "application/json",
    }
})


// Add a response interceptor
axiosInstance.interceptors.response.use(
    (res) => res,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            try{
                await axiosInstance.get('/auth/refresh');
                originalRequest._retry = true;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log(refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
