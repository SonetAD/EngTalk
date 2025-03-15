import { StateCreator } from 'zustand';
import updateTalkTime from '@/libs/api/updateTalkTime';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';

const createUserStatSlice: StateCreator<
  UserStatSliceType & AuthSliceType & VoiceBiteSliceType & OtherUserInfoSliceType,
  [['zustand/immer', never]],
  [],
  UserStatSliceType
> = (set, get) => ({
  userStat: {
    totalGoldCoin: 0,
    totalTrophy: 0,
    level: 0,
    talkTime: 0,
  },
  userStatStatus: {
    isLoading: true,
    isError: false,
    error: '',
  },
  getUserStat: async ({ token }) => {
    try {
      const res = await updateTalkTime({ token, talkTime: null });
      const userData = res.user;
      set((state) => {
        state.userStat.totalGoldCoin = userData.totalGoldCoin;
        state.userStat.totalTrophy = userData.totalTrophy;
        state.userStat.level = userData.level;
        state.userStat.talkTime = userData.talkTime;
        state.userStatStatus.isLoading = false;
        state.userStatStatus.isError = false;
        state.userStatStatus.error = '';
      });
    } catch (err: any) {
      set((state) => {
        state.userStat.totalGoldCoin = 0;
        state.userStat.totalTrophy = 0;
        state.userStat.level = 0;
        state.userStat.talkTime = 0;
        state.userStatStatus.isLoading = false;
        state.userStatStatus.isError = true;
        state.userStatStatus.error = err?.message || 'Something went wrong!';
      });
    }
  },
  setUserStat: async ({ talkTime, token }) => {
    try {
      const res = await updateTalkTime({ token, talkTime });
      const userData = res.user;
      set((state) => {
        state.userStat.totalGoldCoin = userData.totalGoldCoin;
        state.userStat.totalTrophy = userData.totalTrophy;
        state.userStat.level = userData.level;
        state.userStat.talkTime = userData.talkTime;
        state.userStatStatus.isLoading = false;
        state.userStatStatus.isError = false;
        state.userStatStatus.error = '';
      });
    } catch (err: any) {
      set((state) => {
        state.userStat.totalGoldCoin = 0;
        state.userStat.totalTrophy = 0;
        state.userStat.level = 0;
        state.userStat.talkTime = 0;
        state.userStatStatus.isLoading = false;
        state.userStatStatus.isError = true;
        state.userStatStatus.error = err?.message || 'Something went wrong!';
      });
    }
  },
});

export default createUserStatSlice;
