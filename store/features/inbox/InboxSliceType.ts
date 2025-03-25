type User = {
  userName: string;
  name: string;
  avatar: {
    default: boolean;
    src: string;
  };
};
type SingleConversation = {
  _id: string;
  participants: User[];
  lastMessage: {
    message: string;
    sender: User;
    timestamp: string;
  };
  readStatus: boolean;
};

type InboxStatus = {
  isLoading: boolean;
  isError: boolean;
  error: string;
};
type Inbox = {
  inbox: SingleConversation[];
  inboxStatus: InboxStatus;
  hasUnreadMessage: boolean;
  inboxTotalPages: number;
};

type Action = {
  setInbox: () => Promise<void>;
  setReadStatus: (conversationId: string) => void;
};

export type InboxSliceType = Inbox & Action;
