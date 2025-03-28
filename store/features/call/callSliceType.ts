type Call = {
  isInCall?: boolean;
  filteredGender?: string;
  otherCallParticipantAvatar?: {
    src: string;
    stockAvatar: string;
  };
  otherCallParticipantName?: string;
};

type CallSlice = {
  call: Call;
};
type CallAction = {
  setCallInfo: (callData: Call) => void;
};

export type CallSliceType = CallSlice & CallAction;
