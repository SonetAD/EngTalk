import { StateCreator } from 'zustand';
import { AuthSliceType } from './authSliceType';
import userLogin from '@/libs/api/userLogin';

const createAuthSlice: StateCreator<
  AuthSliceType,
  [['zustand/immer', never]],
  [],
  AuthSliceType
> = (set, get) => ({
  user: {
    token: '',
    userInfo: {},
  },
  status: {
    isLoading: true,
    isError: false,
    error: '',
  },
  setUser: async (userName: string, password: string) => {
    try {
      const user = await userLogin({ userName, password });
      set((state)=>{
        state.user.token = user.token;
        state.user.userInfo = user.user;
        state.status.isLoading = false;
        state.status.isError = false;
        state.status.error = '';
      })
    } catch (err: any) {
      set((state) => {
        state.user.token = '';
        state.user.userInfo = {};
        state.status.isLoading = false;
        state.status.isError = true;
        state.status.error = err?.message || 'Something went wrong!';
      });
    }
  },
});

export default createAuthSlice;
