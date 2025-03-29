import { Backend } from '@/config';
import axios from 'axios';

interface Props {
  token: string;
}
const useGoldCoin = async ({ token }: Props) => {
  try {
    axios.put(
      Backend.premiumCallURL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err: any) {
    console.log(err.response?.data);
    throw new Error('Something went wrong');
  }
};
export default useGoldCoin;
