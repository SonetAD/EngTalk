import axios from 'axios';
import { Backend } from '@/config';
import LocalStore from '../localStore';

interface Props {
  userName: string;
  password: string;
}
const userLogin = async (userData: Props) => {
  try {
    const res = await axios.post(Backend.signinURL, userData);
    return res.data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      throw new Error(err?.message);
    }
    if (err?.response?.data?.errors?.validation) {
      LocalStore.clearAll();
    }
    const errorMessage =
      err?.response?.data?.errors?.validation?.msg || 'Something went wrong!';
    throw new Error(errorMessage);
  }
};

export default userLogin;
