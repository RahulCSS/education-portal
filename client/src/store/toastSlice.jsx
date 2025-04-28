import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
    name: 'toast',
    initialState:{
        message:'',
        type:'',
        isvisible:'',
    },
    reducers:{
        showToast:(state,action) => {
            state.message = action.payload.message;
            state.type = action.payload.type || 'info';
            state.isvisible = true;
        },
        hideToast: (state) =>{
            state.isvisible = false;
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;