import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { StoreType } from '@/store/store/StoreType';
import createAuthSlice from '@/store/features/auth/authSlice';
import createUserStatSlice from '@/store/features/userStat/userStatSlice';
import createVoiceBiteSlice from '@/store/features/voiceBite/voiceBiteSlice';
import createOtherUserInfoSlice from '@/store/features/otherUserInfo/OtherUserInfoSlice';
import createConversationSlice from '@/store/features/conversation/ConversationSlice';
import createInboxSlice from '../features/inbox/InboxSlice';
import createUpdateProfile from '@/store/features/updateProfile/updateProfileSlice';

const useCentralStore = create<StoreType>()(
  immer((...a) => ({
    ...createAuthSlice(...a),
    ...createUserStatSlice(...a),
    ...createVoiceBiteSlice(...a),
    ...createOtherUserInfoSlice(...a),
    ...createConversationSlice(...a),
    ...createInboxSlice(...a),
    ...createUpdateProfile(...a),
  }))
);

export default useCentralStore;
