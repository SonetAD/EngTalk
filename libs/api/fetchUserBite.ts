import type { AxiosError } from 'axios';
import type { ApiErrorBody } from './types';
import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  userId: string;
  page: number;
  limit: number;
}

const fetchUserBite = async (data: Props) => {
  try {
    const res = await axios.get(Backend.userPost, {
      params: {
        userId: data.userId,
        page: data.page,
        limit: data.limit,
      },
    });
    return res.data.post;
  } catch (err) {
    const error = err as AxiosError<ApiErrorBody>;
    throw new Error(error?.message);
  }
};

export default fetchUserBite;
