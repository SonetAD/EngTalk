import { StateCreator } from 'zustand';
import userLogin from '@/libs/api/userLogin';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';
import { ConversationSliceType } from '@/store/features/conversation/ConversationSliceType';
import { InboxSliceType } from '@/store/features/inbox/InboxSliceType';
import { UpdateProfileSliceType } from '@/store/features/updateProfile/updateProfileSliceType';
import { CallSliceType } from '@/store/features/call/callSliceType';
import { SearchUserSliceType } from '@/store/features/SearchUser/SearchUserSliceType';
import getUserLocation from '@/libs/getUserLocation';
import updateProfile from '@/libs/api/updateProfile';

const createAuthSlice: StateCreator<
  AuthSliceType &
    UserStatSliceType &
    VoiceBiteSliceType &
    OtherUserInfoSliceType &
    ConversationSliceType &
    InboxSliceType &
    UpdateProfileSliceType &
    CallSliceType &
    SearchUserSliceType,
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
      location: '',
      email: '',
      gender: '',
      avatar: {
        src: '',
        stockAvatar: '',
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
      let res = await userLogin({ userName, password });
      const location = await getUserLocation();
      if (location != res.user.location) {
        console.log('new location')
        await updateProfile({
          token: res.token,
          userId: res.user.id,
          location: location,
        });
         res = await userLogin({ userName, password });
      }
      set((state) => {
        state.user.token = res.token;
        state.user.userInfo = {
          userId: res.user.id,
          userName: res.user.userName,
          name: res.user.name,
          location: res.user.location,
          email: res.user.email,
          gender: res.user.gender,
          avatar: res.user.avatar,
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
          userId: '',
          location: '',
          name: '',
          email: '',
          gender: '',
          avatar: {
            src: '',
            stockAvatar: '',
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
