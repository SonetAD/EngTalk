type User = {
  token: string;
  userInfo: {};
};

type Status = {
  isLoading: boolean;
  isError: boolean;
  error: string ;
};

type AuthState= {
  user: User,
  status: Status
};

type AuthAction={
    setUser:(userName:string,password:string)=>Promise<void>
}

export  type AuthSliceType= AuthState & AuthAction