import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  token: string;
  otherUserName: string;
  page: number;
  limit: number;
}

const fetchConversation = async (data: Props) => {
  try {
    const res = await axios.post(
      Backend.conversationURL,
      {
        receiver: data.otherUserName,
        page: data.page,
        limit: data.limit,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return res.data.conversation;
  } catch (err: any) {
    console.log(err.response?.data);
    throw new Error(err?.message);
  }
};

export default fetchConversation;
