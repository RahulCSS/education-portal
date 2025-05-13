import {axiosInstance} from '.'

//Signup
export const SignupUser = async (payload) => {
    try{
        const response = await axiosInstance.post("/user/signup",payload);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};

// Login 
export const LoginUser = async (payload) => {
    try{
        const response = await axiosInstance.post("/user/login",payload);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};

// Logout
export const LogoutUser = async (payload) => {
    try{
        const response = await axiosInstance.post(`/user/logout/${payload}`);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};

// Email Check
export const CheckEmail = async (payload) => {
    try{
        const response = await axiosInstance.post(`/user/check-email/${payload}`);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};