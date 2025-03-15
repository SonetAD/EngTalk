import { StateCreator } from 'zustand';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import fetchUserBite from '@/libs/api/fetchUserBite';
import fetchAllBites from '@/libs/api/fetchAllBite';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';

const createVoiceBiteSlice: StateCreator<
  VoiceBiteSliceType & AuthSliceType & UserStatSliceType & OtherUserInfoSliceType,
  [['zustand/immer', never]],
  [],
  VoiceBiteSliceType
> = (set, get) => ({
  allBites: {
    posts: [],
    totalPages: 0,
    totalPosts: 0,
  },
  userBites: {
    posts: [],
    totalPages: 0,
    totalPosts: 0,
  },

  voiceBiteStatus: {
    isLoading: true,
    isError: false,
    error: '',
  },
  getVoiceBite: async ({ userName }) => {
    try {
      const [userBites, allBites] = await Promise.all([
        fetchUserBite({ userName, page: 1, limit: 10 }),
        fetchAllBites({ page: 1, limit: 10 }),
      ]);
      set((state) => {
        state.allBites = allBites;
        state.userBites = userBites;
        state.voiceBiteStatus.isLoading = false;
        state.voiceBiteStatus.isError = false;
        state.voiceBiteStatus.error = '';
      });
    } catch (err: any) {
      set((state) => {
        state.allBites = { posts: [], totalPages: 0, totalPosts: 0 };
        state.userBites = { posts: [], totalPages: 0, totalPosts: 0 };
        state.voiceBiteStatus.isLoading = false;
        state.voiceBiteStatus.isError = true;
        state.voiceBiteStatus.error = err?.message || 'Something went wrong!';
      });
    }
  },
});

export default createVoiceBiteSlice;
