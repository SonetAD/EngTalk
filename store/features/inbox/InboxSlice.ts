import { StateCreator } from 'zustand';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';
import { ConversationSliceType } from '@/store/features/conversation/ConversationSliceType';
import { InboxSliceType, SingleConversation } from '@/store/features/inbox/InboxSliceType';
import fetchInbox from '@/libs/api/fetchInbox';
import { UpdateProfileSliceType } from '@/store/features/updateProfile/updateProfileSliceType';
import { CallSliceType } from '@/store/features/call/callSliceType';
import { SearchUserSliceType } from '@/store/features/SearchUser/SearchUserSliceType';

const defaultUser = {
  userName: '',
  avatar: {
    src: '',
    stockAvatar: '',
  },
  name: '',
};

const defaultLastMessage = {
  sender: defaultUser,
  message: '',
  timestamp: '',
};

const createInboxSlice: StateCreator<
  InboxSliceType &
    ConversationSliceType &
    VoiceBiteSliceType &
    AuthSliceType &
    UserStatSliceType &
    OtherUserInfoSliceType &
    UpdateProfileSliceType &
    CallSliceType &
    SearchUserSliceType,
  [['zustand/immer', never]],
  [],
  InboxSliceType
> = (set, get) => ({
  inbox: [
    {
      _id: '',
      participants: [defaultUser],
      lastMessage: defaultLastMessage,
      readStatus: false,
    },
  ],
  inboxStatus: {
    isLoading: true,
    isError: false,
    error: '',
  },
  hasUnreadMessage: false,
  inboxTotalPages: 0,
  setInbox: async () => {
    try {
      const res = await fetchInbox({
        token: get().user.token,
        page: 1,
        limit: 10,
      });
      const hasUnradMessage = res.conversations.some(
        (conversation: { readStatus: boolean }) => !conversation.readStatus
      );

      set((state) => {
        state.inbox = res.conversations;
        state.inboxTotalPages = res.totalPages;
        state.hasUnreadMessage = hasUnradMessage;
        state.inboxStatus.isLoading = false;
        state.inboxStatus.isError = false;
        state.inboxStatus.error = '';
      });
    } catch (err) {
      if (__DEV__) console.log(err);
      set((state) => {
        state.inbox = [];
        state.inboxTotalPages = 0;
        state.inboxStatus.isLoading = false;
        state.inboxStatus.isError = true;
        state.inboxStatus.error = (err as Error)?.message || 'Something went wrong!';
      });
    }
  },
  setReadStatus: async (conversationId: string) => {
    set((state) => {
      const findConversation = state.inbox.findIndex(
        (conversation: SingleConversation) => conversation._id === conversationId
      );
      state.inbox[findConversation].readStatus = true;
      const hasUnradMessage = state.inbox.some(
        (conversation: SingleConversation) => !conversation.readStatus
      );
      state.hasUnreadMessage = hasUnradMessage;
    });
  },
});

export default createInboxSlice;
