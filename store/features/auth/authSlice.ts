import { StateCreator } from 'zustand';
import userLogin from '@/libs/api/userLogin';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';
import { ConversationSliceType } from '@/store/features/conversation/ConversationSliceType';
import { InboxSliceType } from '@/store/features/inbox/InboxSliceType';
import { UpdateProfileSliceType } from '@/store/features/updateProfile/updateProfileSliceType';

const createAuthSlice: StateCreator<
  AuthSliceType &
    UserStatSliceType &
    VoiceBiteSliceType &
    OtherUserInfoSliceType &
    ConversationSliceType &
    InboxSliceType &
    UpdateProfileSliceType,
  [['zustand/immer', never]],
  [],
  AuthSliceType
> = (set, get) => ({
  user: {
    token: '',
    userInfo: {
      userId: '',
      userName: '',
      name: '',
      email: '',
      gender: '',
      avatar:'',
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
          userId: res.user.id,
          userName: res.user.userName,
          name: res.user.name,
          email: res.user.email,
          gender: res.user.gender,
          avatar:res.user.avatar,
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
          email: '',
          gender: '',
          avatar:'',
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
