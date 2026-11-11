import type { AxiosError } from 'axios';
import type { ApiErrorBody } from './types';
import { Backend } from "@/config";
import axios from "axios";

interface Props {
  token: string;
  messageId: string;
}
const deleteMessage = async ({ token, messageId }: Props) => {
    try{
        await axios.delete(Backend.deleteMessageURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                messageId,
            },
        })
    }
    catch (err) {
      const error = err as AxiosError<ApiErrorBody>;
        if (__DEV__) console.log(error?.response?.data);
    }
};

export default deleteMessage;
