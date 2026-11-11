import type { AxiosError } from 'axios';
import type { ApiErrorBody } from './types';
import { Backend } from '@/config';
import axios from 'axios';

const getUserInfo = async (userId: string) => {
  try {
    const user = await axios.get(Backend.userInfo, {
      params: {
        userId,
      },
    });
    return user.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorBody>;
    throw new Error(
      error?.response?.data?.errors?.common?.msg || 'Something went wrong!'
    );
  }
};

export default getUserInfo;
