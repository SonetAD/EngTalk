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

type VoiceBiteAction = {
  getVoiceBite: () => Promise<void>;
};

export type VoiceBiteSliceType = VoiceBiteState & VoiceBiteAction;
