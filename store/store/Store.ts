import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { StoreType } from './StoreType';
import createAuthSlice from '../features/auth/authSlice';
import createUserStatSlice from '@/store/features/userStat/userStatSlice';
import createVoiceBiteSlice from '../features/voiceBite/voiceBiteSlice';
import createOtherUserInfoSliceJJ from '../features/otherUserInfo/OtherUserInfoSlice';
import createConversationSlice from '../features/conversation/ConversationSlice';

const useCentralStore = create<StoreType>()(
  immer((...a) => ({
    ...createAuthSlice(...a),
    ...createUserStatSlice(...a),
    ...createVoiceBiteSlice(...a),
    ...createOtherUserInfoSliceJJ(...a),
    ...createConversationSlice(...a),
  }))
);

export default useCentralStore;
