import { StateCreator } from 'zustand';
import userLogin from '@/libs/api/userLogin';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';

const createOtherUserInfoSliceJJ: StateCreator<
  OtherUserInfoSliceType &
    AuthSliceType &
    UserStatSliceType &
    VoiceBiteSliceType,
  [['zustand/immer', never]],
  [],
  OtherUserInfoSliceType
> = (set, get) => ({
  otherUser: '',
  setOtherUser: (userName: string) => {
    set((state) => {
      state.otherUser = userName;
    });
  },
});

export default createOtherUserInfoSliceJJ;
