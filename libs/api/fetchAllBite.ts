import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  page: number;
  limit: number;
}

const fetchAllBites = async (data: Props) => {
  try {
    const res = await axios.post(Backend.allPost, {
      page: data.page,
      limit: data.limit,
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

export default fetchAllBites;
