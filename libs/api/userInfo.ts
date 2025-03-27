import { Backend } from '@/config';
import axios from 'axios';

const getUserInfo = async (userId: string) => {
  try {
    const user = await axios.get(Backend.userInfo, {
      params: {
        userId,
      },
    });
    return user.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.errors?.common?.msg || 'Something went wrong!'
    );
  }
};

export default getUserInfo;
