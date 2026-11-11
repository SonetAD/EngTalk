import type { AxiosError } from 'axios';
import type { ApiErrorBody } from './types';
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
  } catch (err) {
    const error = err as AxiosError<ApiErrorBody>;
    if (__DEV__) console.log(error.response?.data);
    throw new Error('Something went wrong');
  }
};
export default convertSilverCoin;
