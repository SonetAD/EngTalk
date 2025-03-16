import { Backend } from '@/config';
import axios from 'axios';

interface Props {
  userName: string;
  token: string;
}
const followUser = async ({ token, userName }: Props) => {
  try {
    const res = await axios.put(
      Backend.followUserURL,
      { userName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.errors?.validation?.msg || 'Something went wrong!';
    throw new Error(errorMessage);
  }
};

export default followUser;
