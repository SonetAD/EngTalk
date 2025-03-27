type User = {
  userName?: string;
  name?: string;
  email?: string;
  avatar?: string;
  password?: string;
};

type UpdateProfileSlice = {
  updateProfile: User;
};

type UpdateProfileAction = {
  setUpdateProfile: (userInfo: User) => void;
};

export type UpdateProfileSliceType = UpdateProfileSlice & UpdateProfileAction;
