import { StateCreator } from 'zustand';
import { AuthSliceType } from '@/store/features/auth/authSliceType';
import { UserStatSliceType } from '@/store/features/userStat/userStatSliceType';
import { VoiceBiteSliceType } from '@/store/features/voiceBite/voiceBiteSliceType';
import fetchUserBite from '@/libs/api/fetchUserBite';
import fetchAllBites from '@/libs/api/fetchAllBite';
import { OtherUserInfoSliceType } from '@/store/features/otherUserInfo/OtherUserInfoSliceType';
import { ConversationSliceType } from '@/store/features/conversation/ConversationSliceType';
import fetchConversation from '@/libs/api/fetchConversation';
import getUserInfo from '@/libs/api/userInfo';

const defaultUser = {
  userName: '',
  avatar: {
    default: true,
    src: '',
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
    OtherUserInfoSliceType,
  [['zustand/immer', never]],
  [],
  ConversationSliceType
> = (set, get) => ({
  otherChatParticipant: defaultUser,
  messages: [defaultMessage],
  totalMessages: 0,
  totalPages: 0,

  conversationStatus: {
    isLoading: true,
    isError: false,
    error: '',
  },
  getConversation: async (otherUserName) => {
    try {
      const res = await fetchConversation({
        token: get().user.token,
        otherUserName,
        page: 1,
        limit: 10,
      });
      let otherChatParticipant=defaultUser;
      if (res.participants) {
        otherChatParticipant = res.participants.find(
          (user: any) => user.userName !== get().user.userInfo.userName
        );
      }
      else{
        const getOtherChatParticipantInfo=await getUserInfo(otherUserName);
        otherChatParticipant=getOtherChatParticipantInfo.user;
      }

      set((state) => {
        state.otherChatParticipant = otherChatParticipant;
        state.messages = res.messages;
        state.totalMessages = res.totalMessages;
        state.totalPages = res.totalPages;
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
        state.totalPages = 0;
        state.conversationStatus.isLoading = false;
        state.conversationStatus.isError = true;
        state.conversationStatus.error =
          err?.message || 'Something went wrong!';
      });
    }
  },
});

export default createConversationSlice;
