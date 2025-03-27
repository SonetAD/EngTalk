import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  name: string;
  email: string;
  gender: string;
  password: string;
}
const createAccount = async (userData: Props) => {
  try {
    const res = await axios.post(Backend.signupURL, userData);
    return res.data;
  } catch (err: any) {
    console.log(err?.response?.data);
    const errorMessage =
      err?.response?.data?.errors?.validation?.msg || 'Something went wrong!';
    throw new Error(errorMessage);
  }
};

export default createAccount;
