import { Backend } from '@/config';
import axios from 'axios';

interface Props {
  token: string;
  receiverId: string;
  message: string;
  messageType: string;
}
const sendMessage = async ({
  token,
  receiverId,
  message,
  messageType,
}: Props) => {
  try {
    const res = await axios.post(
      Backend.sendMessageURL,
      {
        receiverId,
        message,
        messageType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.errors?.validation?.msg || 'Something went wrong!';
    throw new Error(errorMessage);
  }
};

export default sendMessage;
