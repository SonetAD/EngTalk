type User = {
  userId: string;
  avatar:{
    src:string;
    stockAvatar:string;
  };
  name: string;
  isBlueTicked:boolean;
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
  conversationId: string;
  otherChatParticipant: User;
  messages: Message[];
  totalMessages: number;
  totalConversationPages: number;
  conversationStatus: ConversationStatus;
};

type ConversationAction = {
  getConversation: (otherUserId: string) => Promise<void>;
};

export type ConversationSliceType = Conversation & ConversationAction;
