import type { AxiosError } from 'axios';
import type { ApiErrorBody } from './types';
import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  token: string;
  page: number;
  limit: number;
}

const fetchInbox = async (data: Props) => {
  try {
    const res = await axios.get(
      Backend.inboxURL,
      {
        params:{
          page: data.page,
          limit: data.limit,
  
        },
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return res.data.chat;
  } catch (err) {
    const error = err as AxiosError<ApiErrorBody>;
    if (__DEV__) console.log(error.response?.data);
    throw new Error(error?.message);
  }
};

export default fetchInbox;
