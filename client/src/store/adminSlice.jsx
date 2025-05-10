import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState:{
        students:[],
        tutors:[],
        courses:[],
    },
    reducers:{
        clearAdminData: (state) =>{
            state.students = [];
            state.tutors = [];
            state.courses = [];
        }
    }
});

export const { clearAdminData } = adminSlice.actions;

export default adminSlice.reducer;