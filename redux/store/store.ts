import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/features/auth/authSlice';
import userStatReducer from '../features/user/userStatSlice';

const Store = configureStore({
  reducer: {
    auth: authReducer,
    userStat: userStatReducer,
  },
});
export default Store;
