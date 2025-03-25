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
  } catch (err: any) {
    console.log(err.response?.data);
    throw new Error(err?.message);
  }
};

export default fetchInbox;
