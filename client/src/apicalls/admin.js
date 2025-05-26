import {axiosInstance} from '.'

// Get Students
export const GetStudents = async (params) => {
    try{
        const query = new URLSearchParams(params).toString();
        const response = await axiosInstance.get(`/user/get-students?${query}`);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};

// Get Tutors
export const GetTutors = async (params) => {
    try{
        const query = new URLSearchParams(params).toString();
        const response = await axiosInstance.get(`/user/get-tutors?${query}`);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};

// Signup Tutor
export const SignupTutor = async (payload) => {
    try{
        const response = await axiosInstance.post("/user/signup-tutor",payload);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};

// Get Courses
export const GetCourses = async (params) => {
    try{
        const query = new URLSearchParams(params).toString();
        const response = await axiosInstance.get(`/user/get-courses?${query}`);
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};

// Get Count
export const GetCount = async () => {
    try{
        const response = await axiosInstance.get("/user/get-count");
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
};