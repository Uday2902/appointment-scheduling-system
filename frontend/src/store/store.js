import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../state/authSlice';

const store = configureStore({
    reducer: {
        users: authSlice
    }
});

export default store;
