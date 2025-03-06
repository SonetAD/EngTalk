import { Backend } from '@/config';
import axios from 'axios';

const getUserInfo = async (userName: string) => {
  try {
    const user = await axios.get(`${Backend.userInfo}/${userName}`);
    return user.data;
  } catch (err: any) {
    console.log(err?.response?.data);
    throw new Error(err?.message || 'Something went wrong!');
  }
};

export default getUserInfo;
