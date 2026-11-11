import type { AxiosError } from 'axios';
import type { ApiErrorBody } from './types';
import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  token: string;
  userId: string;
  page: number;
  limit: number;
}

const fetchConversation = async (data: Props) => {
  try {
    const res = await axios.get(Backend.conversationURL, {
      params: {
        receiverId: data.userId,
        page: data.page,
        limit: data.limit,
      },

      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return res.data.conversation;
  } catch (err) {
    const error = err as AxiosError<ApiErrorBody>;
    if (__DEV__) console.log(error.response?.data);
    throw new Error(error?.message);
  }
};

export default fetchConversation;
