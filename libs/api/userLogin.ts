import type { AxiosError } from 'axios';
import type { ApiErrorBody } from './types';
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
  } catch (err) {
    const error = err as AxiosError<ApiErrorBody>;
    if (error?.response?.data?.errors?.validation) {
      LocalStore.clearAll();
    }
    const errorMessage =
      error?.response?.data?.errors?.validation?.msg || error?.message || 'Something went wrong!';
    throw new Error(errorMessage);
  }
};

export default userLogin;
