import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  name: string;
  email: string;
  gender: string;
  password: string;
}
const createAccount = async (userData: Props) => {
  const userForm = new FormData();

  userForm.append('name', userData.name);
  userForm.append('gender', userData.gender);
  userForm.append('email', userData.email);
  userForm.append('password', userData.password);

  try {
    const res = await axios.post(Backend.signupURL, userForm, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.errors?.validation?.msg || 'Something went wrong!';
    throw new Error(errorMessage);
  }
};

export default createAccount;
