import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toastSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
  },
})


