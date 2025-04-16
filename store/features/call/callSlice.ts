import { StateCreator } from 'zustand';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';
import { ConversationSliceType } from '@/store/features/conversation/ConversationSliceType';
import { InboxSliceType } from '@/store/features/inbox/InboxSliceType';
import { UpdateProfileSliceType } from '@/store/features/updateProfile/updateProfileSliceType';
import { CallSliceType } from '@/store/features/call/callSliceType';
import { SearchUserSliceType } from '@/store/features/SearchUser/SearchUserSliceType';

const createCallSlice: StateCreator<
  CallSliceType &
    UpdateProfileSliceType &
    AuthSliceType &
    UserStatSliceType &
    VoiceBiteSliceType &
    OtherUserInfoSliceType &
    ConversationSliceType &
    InboxSliceType &
    SearchUserSliceType,
  [['zustand/immer', never]],
  [],
  CallSliceType
> = (set, get) => ({
  call: {
    filteredGender: 'any',
  },
  setCallInfo: (callData) => {
    set((state) => {
      state.call = { ...state.call, ...callData };
    });
  },
});

export default createCallSlice;
