type User = {
  token: string;
  userInfo: {
    userId:string;
    userName: string;
    name:string;
    email:string;
    gender: string;
    location:string;
    avatar:{
      src:string;
      stockAvatar:string;
    },
    followers: string[];
    following: string[];
    isBlueTicked:boolean
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
