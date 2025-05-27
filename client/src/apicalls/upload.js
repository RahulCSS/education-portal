import { axiosInstance } from ".";

export const UploadImage = async (payload) =>{
    try{
        const response = await axiosInstance.post("/upload/image",payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
    });
        return response.data;
    }catch(error){
        const err = error.response.data;
        return err;
    }
}