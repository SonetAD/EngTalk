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

const createSearchUserSlice: StateCreator<
  SearchUserSliceType &
    UpdateProfileSliceType &
    AuthSliceType &
    UserStatSliceType &
    VoiceBiteSliceType &
    OtherUserInfoSliceType &
    ConversationSliceType &
    InboxSliceType &
    CallSliceType,
  [['zustand/immer', never]],
  [],
  SearchUserSliceType
> = (set, get) => ({
  searchUserText: '',
  setSearchUser: (text) => {
    set((state) => {
      state.searchUserText = text;
    });
  },
});

export default createSearchUserSlice;
