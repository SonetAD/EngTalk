/** Shape of the error body returned by the EngTalk backend. */
export type ApiErrorBody = {
  errors?: {
    validation?: { msg?: string };
    common?: { msg?: string };
  };
};

export type Avatar = {
  src: string;
  stockAvatar: string;
};

/** Public user summary embedded in bites, search results and leaderboards. */
export type UserSummary = {
  _id: string;
  name: string;
  avatar: Avatar;
  isBlueTicked: boolean;
};

export type VoiceBitePost = {
  _id: string;
  file: string;
  user: UserSummary;
};

export type LeaderBoardUser = UserSummary & {
  gender: string;
  totalTrophy: number;
};

/** Response of the user-info endpoint, plus the socket id added in Call. */
export type MatchedUserData = {
  user: UserSummary & { level: number; location: string };
  targetSocketId: string;
};
