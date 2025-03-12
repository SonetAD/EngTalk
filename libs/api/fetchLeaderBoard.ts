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
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

export default fetchLeaderBoard;
