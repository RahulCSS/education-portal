import {axiosInstance} from '.'

// Add Course
export const AddCourse = async (payload) => {
    try{
        const response = await axiosInstance.post("/course/add-course",payload);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};