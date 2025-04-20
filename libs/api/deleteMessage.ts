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
    catch(err){
        console.log(err)
    }
};

export default deleteMessage;
