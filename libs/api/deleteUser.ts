import { Backend } from '@/config';
import axios from 'axios';

interface Props {
  token: string;
}
const deleteUser = async ({ token }: Props) => {
  try {
    await axios.delete(Backend.deleteUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (err) {
    if (__DEV__) console.log(err);
  }
};

export default deleteUser;
