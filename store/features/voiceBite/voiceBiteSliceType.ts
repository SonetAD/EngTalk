import type { VoiceBitePost } from '@/libs/api/types';

type VoiceBite = {
  posts: VoiceBitePost[];
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
