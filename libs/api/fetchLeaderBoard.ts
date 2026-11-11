import type { AxiosError } from 'axios';
import type { ApiErrorBody } from './types';
import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  token: string;
}

const fetchLeaderBoard = async ({token}:Props) => {
  try {
    const res = await axios.get(Backend.leaderBoard,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorBody>;
    throw new Error(error?.message);
  }
};

export default fetchLeaderBoard;
