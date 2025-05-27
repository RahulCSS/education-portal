import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: 'course',
    initialState:{
        course_id: null,
    },
    reducers:{
        setCourse: (state, action) => {
            state.course_id = action.payload;
        },
        clearCourse: (state) =>{
            state.course_id = null;
        }
    }
});

export const { setCourse, clearCourse } = courseSlice.actions;

export default courseSlice.reducer;