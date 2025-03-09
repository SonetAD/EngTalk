type User = {
  token: string;
  userInfo: {
    userName: string;
    name:string;
    gender: string;
    avatar: {
      default: boolean;
      src: string;
    };
    followers: [];
    following: [];
  };
};

type AuthStatus = {
  isLoading: boolean;
  isError: boolean;
  error: string;
};

type AuthState = {
  user: User;
  authStatus: AuthStatus;
};

type Props = {
  userName: string;
  password: string;
};
type AuthAction = {
  setUser: ({ userName, password }: Props) => Promise<void>;
};

export type AuthSliceType = AuthState & AuthAction;
