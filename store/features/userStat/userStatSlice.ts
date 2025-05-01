import { StateCreator } from 'zustand';
import updateTalkTime from '@/libs/api/updateTalkTime';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';
import { ConversationSliceType } from '@/store/features/conversation/ConversationSliceType';
import { InboxSliceType } from '@/store/features/inbox/InboxSliceType';
import { UpdateProfileSliceType } from '@/store/features/updateProfile/updateProfileSliceType';
import { CallSliceType } from '@/store/features/call/callSliceType';
import { SearchUserSliceType } from '@/store/features/SearchUser/SearchUserSliceType';

const createUserStatSlice: StateCreator<
  UserStatSliceType &
    AuthSliceType &
    VoiceBiteSliceType &
    OtherUserInfoSliceType &
    ConversationSliceType &
    InboxSliceType &
    UpdateProfileSliceType &
    CallSliceType &
    SearchUserSliceType,
  [['zustand/immer', never]],
  [],
  UserStatSliceType
> = (set, get) => ({
  userStat: {
    totalGoldCoin: 0,
    totalSilverCoin: 0,
    totalTrophy: 0,
    level: 0,
    talkTime: 0,
  },
  userStatStatus: {
    isLoading: true,
    isError: false,
    error: '',
  },
  getUserStat: async () => {
    try {
      const res = await updateTalkTime({
        token: get().user.token,
        talkTime: null,
      });
      const userData = res.user;
      set((state) => {
        state.userStat.totalGoldCoin = userData.totalGoldCoin;
        state.userStat.totalSilverCoin = userData.totalSilverCoin;
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
        state.userStat.totalSilverCoin = 0;
        state.userStat.totalTrophy = 0;
        state.userStat.level = 0;
        state.userStat.talkTime = 0;
        state.userStatStatus.isLoading = false;
        state.userStatStatus.isError = true;
        state.userStatStatus.error = err?.message || 'Something went wrong!';
      });
    }
  },
  setUserStat: async (talkTime) => {
    try {
      const res = await updateTalkTime({ token: get().user.token, talkTime });
      const userData = res.user;
      set((state) => {
        state.userStat.totalGoldCoin = userData.totalGoldCoin;
        state.userStat.totalSilverCoin = userData.totalSilverCoin;
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
        state.userStat.totalSilverCoin = 0;
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
