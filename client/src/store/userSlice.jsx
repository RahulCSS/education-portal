import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        id: null,
        fullname: null,
        email: null,
        role: null,
        phone: null,
        profile: {},
        address: {},
        enrolled_courses:[],
        created_courses:[],
        session_id: null,
    },
    reducers:{
        setRole: (state,action) => {
            state.role = action.payload;
        },
        clearRole: (state) => {
            state.role = null;
        },
        setUser: (state, action) => {
            const payload = action.payload || {};
            const newState = {...state};
              newState.id= payload._id ?? state.id;
              newState.fullname= payload.fullname ?? state.fullname;
              newState.email= payload.email ?? state.email;
              newState.profile= payload.profile ?? state.profile;
              newState.phone= payload.phone ?? state.phone;
              newState.address= payload.address ?? state.address;
              newState.role= payload.role ?? state.role;
              newState.enrolled_courses= payload.enrolled_courses ?? state.enrolled_courses;
              newState.created_courses= payload.created_courses ?? state.created_courses;
              newState.session_id = payload.session_id ?? state. session_id;
            return newState;
        },

        clearUser: (state) => {
            state.id = null;
            state.fullname = null;
            state.email = null;
            state.phone = null;
            state.role = null;
            state.profile = {};
            state.address = {};
            state.enrolled_courses = [];
            state.created_courses = [];
            state.session_id = null;
        },
    }

});

export const { setRole, clearRole, setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;