import {axiosInstance} from '.'

export const GetStudents = async (params) => {
    try{
        const query = new URLSearchParams(params).toString();
        console.log(query);
        const response = await axiosInstance.get(`/user/get-students?${query}`);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};

export const GetTutors = async () => {
    try{
        const response = await axiosInstance.get("/user/get-tutors");
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};