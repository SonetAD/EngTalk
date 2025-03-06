import axios from 'axios';
import { Backend } from '@/config';

const fetchUserPost = async (userName: string) => {
  try {
    const res = await axios.get(`${Backend.userPost}/${userName}`);
    return res.data.post;
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

export default fetchUserPost;
