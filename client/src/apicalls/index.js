import axios from 'axios'
import { showToast } from '../store/toastSlice';
import { clearUser } from '../store/userSlice';
import { store } from '../store/store';

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
        if (error.response && error.response.status === 401 && error.response.data.message === 'No access token' && !originalRequest._retry) {
            try{
                await axiosInstance.get('/auth/refresh');
                originalRequest._retry = true;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        if(error.response && [
            'No refresh token',
            'User not found',
            'Session expired',
            'No token found',
            'Invalid refresh token',
            'Refresh token expired or invalid',
        ].includes(error.response.data.message)
        ){
            store.dispatch(clearUser());
            store.dispatch(showToast({ message: 'Token expired! Logged out', type: 'info' }));
        }
        return Promise.reject(error);
    }
);
