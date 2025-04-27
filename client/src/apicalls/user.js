import {instance} from '.'

//Register
export const RegisterUser = async (payload) => {
    try{
        const response = await axiosInstance.post("/user/register",payload);
        return response.data;
    }catch(err){
        console.log(err);
        return err;
    }
};

// Login 
export const LoginUser = async (payload) => {
    try{
        const response = await axiosInstance.post("/user/login",payload);
        return response.data;
    }catch(err){
        return err;
    }
};