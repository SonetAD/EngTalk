import { StateCreator } from 'zustand';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';
import { ConversationSliceType } from '@/store/features/conversation/ConversationSliceType';
import { InboxSliceType } from '@/store/features/inbox/InboxSliceType';
import { UpdateProfileSliceType } from '@/store/features/updateProfile/updateProfileSliceType';

const createUpdateProfile: StateCreator<
  UpdateProfileSliceType &
    AuthSliceType &
    UserStatSliceType &
    VoiceBiteSliceType &
    OtherUserInfoSliceType &
    ConversationSliceType &
    InboxSliceType,
  [['zustand/immer', never]],
  [],
  UpdateProfileSliceType
> = (set, get) => ({
  updateProfile: {
    userName: '',
    name: '',
    email: '',
    avatar:{
      src:'',
      stockAvatar:'',
    },
    password: '',
  },
  setUpdateProfile: (userInfo) => {
    set((state) => {
      state.updateProfile = { ...state.updateProfile, ...userInfo };
    });
  },
});

export default createUpdateProfile;
