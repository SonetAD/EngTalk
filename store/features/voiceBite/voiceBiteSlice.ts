import { StateCreator } from 'zustand';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import fetchUserBite from '@/libs/api/fetchUserBite';
import fetchAllBites from '@/libs/api/fetchAllBite';

const createVoiceBiteSlice: StateCreator<
  VoiceBiteSliceType & AuthSliceType & UserStatSliceType,
  [['zustand/immer', never]],
  [],
  VoiceBiteSliceType
> = (set, get) => ({
  allBites: {
    posts: [],
    pages: 0,
    total: 0,
  },
  userBites: {
    posts: [],
    pages: 0,
    total: 0,
  },

  voiceBiteStatus: {
    isLoading: true,
    isError: false,
    error: '',
  },
  getVoiceBite: async ({ userName }) => {
    try {
      const [userBites, allBites] = await Promise.all([
        fetchUserBite({ userName, page: 1, limit: 20 }),
        fetchAllBites({ page: 1, limit: 20 }),
      ]);
      set((state) => {
          state.allBites=allBites
          state.userBites=userBites
        state.voiceBiteStatus.isLoading = false;
        state.voiceBiteStatus.isError = false;
        state.voiceBiteStatus.error = '';
      });
    } catch (err: any) {
      set((state) => {
          state.allBites={posts:[],pages:0,total:0}
          state.userBites={posts:[],pages:0,total:0}
        state.voiceBiteStatus.isLoading = false;
        state.voiceBiteStatus.isError = true;
        state.voiceBiteStatus.error = err?.message || 'Something went wrong!';
      });
    }
  },
});

export default createVoiceBiteSlice;
