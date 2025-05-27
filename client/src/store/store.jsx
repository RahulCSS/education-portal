import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import toastReducer from './toastSlice'
import userReducer from './userSlice'
import adminReducer from './adminSlice'
import courseReducer from './courseSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','toast'], 
};

const rootReducer = combineReducers({
  toast: toastReducer,
  user: userReducer,
  admin: adminReducer,
  course: courseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);

