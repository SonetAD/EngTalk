import type { AxiosError } from 'axios';
import type { ApiErrorBody } from './types';
import { Backend } from '@/config';
import axios from 'axios';

interface Props {
  token: string;
}
const spendGoldCoin = async ({ token }: Props) => {
  try {
    await axios.put(
      Backend.premiumCallURL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    const error = err as AxiosError<ApiErrorBody>;
    if (__DEV__) console.log(error.response?.data);
    throw new Error('Something went wrong');
  }
};
export default spendGoldCoin;
