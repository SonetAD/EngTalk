type User = {
  token: string;
  userInfo: {};
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
