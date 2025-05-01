import { Backend } from '@/config';
import axios from 'axios';

interface Props {
  token: string;
}
const convertSilverCoin = async ({ token }: Props) => {
  try {
    await axios.put(
      Backend.convertSilverCoin,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true
  } catch (err: any) {
    console.log(err.response?.data);
    throw new Error('Something went wrong');
  }
};
export default convertSilverCoin;
