type OtherUserInfoState = {
  otherUser: string;
};

type OtherUserInfoAction = {
  setOtherUser: (userName: string) => void;
};


export type OtherUserInfoSliceType= OtherUserInfoState & OtherUserInfoAction