import {axiosInstance} from '.'

export const GetAllStudents = async () => {
    try{
        const response = await axiosInstance.get("/user/get-all-students");
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};

export const GetAllTutors = async () => {
    try{
        const response = await axiosInstance.get("/user/get-all-tutors");
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};