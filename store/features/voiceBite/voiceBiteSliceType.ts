type VoiceBite = {
  posts: [];
  totalPages: number;
  totalPosts: number;
};

type VoiceBiteStatus = {
  isLoading: boolean;
  isError: boolean;
  error: string;
};

type VoiceBiteState = {
  allBites: VoiceBite;
  userBites: VoiceBite;
  voiceBiteStatus: VoiceBiteStatus;
};

type Prop = {
  userName: string;
};
type VoiceBiteAction = {
  getVoiceBite: ({ userName }: Prop) => Promise<void>;
};

export type VoiceBiteSliceType = VoiceBiteState & VoiceBiteAction;
