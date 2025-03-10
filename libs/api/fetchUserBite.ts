import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  userName: string;
  page: number;
  limit: number;
}

const fetchUserBite = async (data: Props) => {
  try {
    const res = await axios.post(Backend.userPost, {
      userName: data.userName,
      page: data.page,
      limit: data.limit,
    });
    return res.data.post;
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

export default fetchUserBite;
