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

// Get Course by Tutor ID
export const GetCoursebyTutorId = async (payload) => {
    const { userId, ...params } = payload
    try{
        const response = await axiosInstance.get("/course/get-course",{
            params: {...params, userId}
        });
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};


// Get Course by  ID
export const GetCoursebyId = async (id) => {
    try{
        const response = await axiosInstance.get(`/course/get-course-by-Id/${id}`);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};

// Delete Course
export const DeleteCourse = async (id) => {
    try{
        const response = await axiosInstance.delete(`/course/delete-course/${id}`,);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};


