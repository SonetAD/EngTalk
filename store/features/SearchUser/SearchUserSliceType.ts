type SearchUserSlice = {
  searchUserText: string;
};

type SearchUserAction = {
  setSearchUser: (text: string) => void;
};

export type SearchUserSliceType = SearchUserSlice & SearchUserAction;
