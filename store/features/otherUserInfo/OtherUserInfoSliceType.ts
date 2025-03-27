type VoiceBite = {
  posts: [];
  totalPages: number;
  totalPosts: number;
};

type User = {
  userName: string;
  userId:string;
  name: string;
  gender: string;
  avatar: {
    default: boolean;
    src: string;
  };
  followers: string[];
  following: string[];
  level: number;
  talkTime: number;
  totalTrophy: number;
  otherUserBites: VoiceBite;
};

type OtherUserInfoStatus = {
  isLoading: boolean;
  isError: boolean;
  error: string;
};

type OtherUserInfoState = {
  otherUser: User;
  otherUserInfoStatus: OtherUserInfoStatus;
};

type OtherUserInfoAction = {
  setOtherUser: (userId: string) => void;
};

export type OtherUserInfoSliceType = OtherUserInfoState & OtherUserInfoAction;
