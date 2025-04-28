import {axiosInstance} from '.'

//Register
export const SignupUser = async (payload) => {
    try{
        const response = await axiosInstance.post("/user/signup",payload);
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error);
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