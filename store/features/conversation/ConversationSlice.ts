import { StateCreator } from 'zustand';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';
import { ConversationSliceType } from '@/store/features/conversation/ConversationSliceType';
import fetchConversation from '@/libs/api/fetchConversation';
import getUserInfo from '@/libs/api/userInfo';
import { InboxSliceType } from '@/store/features/inbox/InboxSliceType';
import { UpdateProfileSliceType } from '@/store/features/updateProfile/updateProfileSliceType';
import { CallSliceType } from '@/store/features/call/callSliceType';
import { SearchUserSliceType } from '@/store/features/SearchUser/SearchUserSliceType';

const defaultUser = {
  userId: '',
  avatar: {
    src: '',
    stockAvatar: '',
  },
  name: '',
};

const defaultMessage = {
  sender: defaultUser,
  message: '',
  messageType: 'text',
  timestamp: '',
};

const createConversationSlice: StateCreator<
  ConversationSliceType &
    VoiceBiteSliceType &
    AuthSliceType &
    UserStatSliceType &
    OtherUserInfoSliceType &
    InboxSliceType &
    UpdateProfileSliceType &
    CallSliceType &
    SearchUserSliceType,
  [['zustand/immer', never]],
  [],
  ConversationSliceType
> = (set, get) => ({
  conversationId: '',
  otherChatParticipant: defaultUser,
  messages: [defaultMessage],
  totalMessages: 0,
  totalConversationPages: 0,

  conversationStatus: {
    isLoading: true,
    isError: false,
    error: '',
  },
  getConversation: async (otherUserId) => {
    try {
      const res = await fetchConversation({
        token: get().user.token,
        userId: otherUserId,
        page: 1,
        limit: 15,
      });
      let otherChatParticipant = defaultUser;
      if (res.participants) {
        otherChatParticipant = res.participants.find(
          (user: any) => user.userName !== get().user.userInfo.userName
        );
      } else {
        const getOtherChatParticipantInfo = await getUserInfo(otherUserId);
        otherChatParticipant = getOtherChatParticipantInfo.user;
      }

      set((state) => {
        state.conversationId = res.conversationId;
        state.otherChatParticipant = otherChatParticipant;
        state.otherChatParticipant.userId = otherUserId;
        state.messages = res.messages;
        state.totalMessages = res.totalMessages;
        state.totalConversationPages = res.totalPages;
        state.conversationStatus.isLoading = false;
        state.conversationStatus.isError = false;
        state.conversationStatus.error = '';
      });
    } catch (err: any) {
      console.log(err);
      set((state) => {
        state.otherChatParticipant = defaultUser;
        state.messages = [defaultMessage];
        state.totalMessages = 0;
        state.totalConversationPages = 0;
        state.conversationStatus.isLoading = false;
        state.conversationStatus.isError = true;
        state.conversationStatus.error =
          err?.message || 'Something went wrong!';
      });
    }
  },
});

export default createConversationSlice;
