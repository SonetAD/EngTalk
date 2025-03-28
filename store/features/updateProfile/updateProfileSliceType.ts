type User = {
  userName?: string;
  name?: string;
  email?: string;
  avatar?: {
    src: string;
    stockAvatar: string;
  };
  password?: string;
};

type UpdateProfileSlice = {
  updateProfile: User;
};

type UpdateProfileAction = {
  setUpdateProfile: (userInfo: User) => void;
};

export type UpdateProfileSliceType = UpdateProfileSlice & UpdateProfileAction;
