type VoiceBite = {
  posts: [];
  totalPages: number;
  totalPosts: number;
};

type User = {
  userName: string;
  userId: string;
  name: string;
  location:string;
  gender: string;
  avatar: {
    src: string;
    stockAvatar: string;
  };
  followers: string[];
  following: string[];
  isBlueTicked: boolean;
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
  otherUserGoBackRoute: any;
  otherUserInfoStatus: OtherUserInfoStatus;
};

type Props = {
  userId: string;
  goBackRoute: any;
};
type OtherUserInfoAction = {
  setOtherUser: ({ userId, goBackRoute }: Props) => void;
};

export type OtherUserInfoSliceType = OtherUserInfoState & OtherUserInfoAction;
