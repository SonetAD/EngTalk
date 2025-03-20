type UserStat = {
  totalGoldCoin: number;
  totalTrophy: number;
  level: number;
  talkTime: number;
};

type UserStatStatus = {
  isLoading: boolean;
  isError: boolean;
  error: string;
};

type UserStatState = {
  userStat: UserStat;
  userStatStatus: UserStatStatus;
};

type SetProps = {
  talkTime: number;
  token: string;
};
type UserStatAction = {
  getUserStat: () => Promise<void>;
  setUserStat: (talkTime: number) => Promise<void>;
};

export type UserStatSliceType = UserStatState & UserStatAction;
