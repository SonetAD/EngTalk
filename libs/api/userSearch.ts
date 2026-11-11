import type { AxiosError } from 'axios';
import type { ApiErrorBody } from './types';
import { Backend } from '@/config';
import axios from 'axios';

const userSearch = async (search: string) => {
  try {
    const res = await axios.get(Backend.searchURL, {
      params: { query: search },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorBody>;
    if (__DEV__) console.log(error?.response?.data);
    throw new Error('Something went wrong');
  }
};

export default userSearch;