import { Backend } from "@/config";
import axios from "axios";

interface Props {
  token: string;
  receiver: string;
  message: string;
}
const sendMessage = async ({ token, receiver, message }: Props) => {
  try {
      const res=await axios.post(Backend.sendMessageURL,{
        receiver,
        message
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
  } catch (err:any) {
    const errorMessage =
      err?.response?.data?.errors?.validation?.msg || 'Something went wrong!';
    throw new Error(errorMessage);
  }
};

export default sendMessage;
