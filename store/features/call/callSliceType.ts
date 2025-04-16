type Call = {
  filteredGender?: string;
};

type CallSlice = {
  call: Call;
};
type CallAction = {
  setCallInfo: (callData: Call) => void;
};

export type CallSliceType = CallSlice & CallAction;
