import { Backend } from '@/config';
import axios from 'axios';

const userSearch = async (search: string) => {
  try {
    const res = await axios.get(Backend.searchURL, {
      params: { query: search },
    });
    return res.data;
  } catch (err: any) {
    console.log(err?.response?.data);
    throw new Error('Something went wrong');
  }
};

export default userSearch;