import { StateCreator } from 'zustand';
import userLogin from '@/libs/api/userLogin';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';

const createAuthSlice: StateCreator<
  AuthSliceType & UserStatSliceType & VoiceBiteSliceType,
  [['zustand/immer', never]],
  [],
  AuthSliceType
> = (set, get) => ({
  user: {
    token: '',
    userInfo: {},
  },
  authStatus: {
    isLoading: true,
    isError: false,
    error: '',
  },
  setUser: async ({ userName, password }) => {
    try {
      const user = await userLogin({ userName, password });
      set((state) => {
        state.user.token = user.token;
        state.user.userInfo = user.user;
        state.authStatus.isLoading = false;
        state.authStatus.isError = false;
        state.authStatus.error = '';
      });
    } catch (err: any) {
      set((state) => {
        state.user.token = '';
        state.user.userInfo = {};
        state.authStatus.isLoading = false;
        state.authStatus.isError = true;
        state.authStatus.error = err?.message || 'Something went wrong!';
      });
    }
  },
});

export default createAuthSlice;
