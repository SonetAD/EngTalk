type User = {
  userName: string;
  avatar: {
    default: boolean;
    src: string;
  };
  name: string;
};

type Message = {
  sender: User;
  message: string;
  messageType: string;
  fileUrl?: string;
  timestamp: string;
};

type ConversationStatus = {
  isLoading: boolean;
  isError: boolean;
  error: string;
};

type Conversation = {
  otherChatParticipant: User;
  messages: Message[];
  totalMessages:number;
  totalPages:number
  conversationStatus: ConversationStatus;
};

type ConversationAction = {
  getConversation: (otherUserName: string) => Promise<void>;
};

export type ConversationSliceType = Conversation & ConversationAction;
