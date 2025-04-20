import { Backend } from '@/config';
import axios from 'axios';

interface Props {
  token: string;
  voiceBiteId: string;
}
const deleteVoiceBite = async ({ token, voiceBiteId }: Props) => {
  try {
    await axios.delete(Backend.deletePost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        postId:voiceBiteId,
      },
    });
    
    return true;
  } catch (err) {
    console.log(err);
  }
};

export default deleteVoiceBite;
