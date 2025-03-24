import { StateCreator } from 'zustand';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';
import getUserInfo from '@/libs/api/userInfo';
import fetchUserBite from '@/libs/api/fetchUserBite';
import { ConversationSliceType } from '@/store/features/conversation/ConversationSliceType';
import { InboxSliceType } from '@/store/features/inbox/InboxSliceType';

const createOtherUserInfoSlice: StateCreator<
  OtherUserInfoSliceType &
    AuthSliceType &
    UserStatSliceType &
    VoiceBiteSliceType &
    ConversationSliceType &
    InboxSliceType,
  [['zustand/immer', never]],
  [],
  OtherUserInfoSliceType
> = (set, get) => ({
  otherUser: {
    userName: '',
    name: '',
    gender:'',
    avatar: {
      default: true,
      src: '',
    },
    followers: [],
    following: [],
    level: 0,
    talkTime: 0,
    totalTrophy: 0,
    otherUserBites: {
      posts: [],
      totalPages: 0,
      totalPosts: 0,
    },
  },
  otherUserInfoStatus: {
    isLoading: true,
    isError: false,
    error: '',
  },

  setOtherUser: async (userName: string) => {
    try {
      const [otherUserInfo, otherUserVoiceBites] = await Promise.all([
        getUserInfo(userName),
        fetchUserBite({ userName, page: 1, limit: 10 }),
      ]);
      set((state) => {
        state.otherUser = otherUserInfo.user;
        state.otherUserInfoStatus.isLoading = false;
        state.otherUserInfoStatus.isError = false;
        state.otherUserInfoStatus.error = '';
        state.otherUser.otherUserBites = otherUserVoiceBites;
      });
    } catch (error: any) {
      set((state) => {
        state.otherUserInfoStatus.isLoading = false;
        state.otherUserInfoStatus.isError = true;
        state.otherUserInfoStatus.error =
          error?.message || 'Something went wrong!';
      });
    }
  },
});

export default createOtherUserInfoSlice;
