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
    userInfo: {
      userName: '',
      name: '',
      gender: '',
      avatar: {
        default: false,
        src: '',
      },
      followers: [],
      following: [],
    },
  },
  authStatus: {
    isLoading: true,
    isError: false,
    error: '',
  },
  setUser: async ({ userName, password }) => {
    try {
      const res = await userLogin({ userName, password });
      set((state) => {
        state.user.token = res.token;
        state.user.userInfo = {
          userName: res.user.userName,
          name: res.user.name,
          gender: res.user.gender,
          avatar: {
            default: res.user.avatar.default,
            src: res.user.avatar.src,
          },
          followers: res.user.followers,
          following: res.user.following,
        };
        state.authStatus.isLoading = false;
        state.authStatus.isError = false;
        state.authStatus.error = '';
      });
    } catch (err: any) {
      console.log(err);
      set((state) => {
        state.user.token = '';
        state.user.userInfo = {
          userName: '',
          name: '',
          gender: '',
          avatar: {
            default: true,
            src: '',
          },
          followers: [],
          following: [],
        };
        state.authStatus.isLoading = false;
        state.authStatus.isError = true;
        state.authStatus.error = err?.message || 'Something went wrong!';
      });
    }
  },
});

export default createAuthSlice;
