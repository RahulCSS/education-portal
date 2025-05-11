import axios from 'axios'
import { showToast } from '../store/toastSlice';
import { clearUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
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
        if(error.response && (
            (error.response.data.message === 'No refresh token') ||
            (error.response.data.message === 'User not found') ||
            (error.response.data.message === 'Session expired') ||
            (error.response.data.message === 'No token found') ||
            (error.response.data.message === 'Invalid refresh token') ||
            (error.response.data.message === 'Refresh token expired or invalid') 
            )
        ){
            store.dispatch(clearUser());
            store.dispatch(showToast({ message: 'Token expired! Logged out', type: 'info' }));
        }
        return Promise.reject(error);
    }
);
