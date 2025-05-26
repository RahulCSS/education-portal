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

// Get Course by ID
export const GetCoursebyId = async (payload) => {
    const { userId, ...params } = payload
    try{
        const query = new URLSearchParams(params).toString();
        const response = await axiosInstance.get("/course/get-course",{
            params: {...params, userId}
        });
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};