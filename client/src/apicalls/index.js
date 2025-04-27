import {axios} from 'axios'

export const instance = axios.create({
    baseUrl: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`,
    headers:{
        withCredentials: true,
        "Content-type": "application/json",
    }
})