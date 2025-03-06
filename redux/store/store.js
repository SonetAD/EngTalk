import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/features/auth/authSlice';
import userStatReducer from '../features/user/userStatSlice';
import voiceBiteReducer from '../features/voiceBites/VoiceBiteSlice';

const Store = configureStore({
  reducer: {
    auth: authReducer,
    userStat: userStatReducer,
    voiceBite:voiceBiteReducer
  },
});
export default Store;
