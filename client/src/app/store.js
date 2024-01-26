// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSLice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
