import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  userName: string;
  token: string;
  file: string;
}

const uploadBite = async (data: Props) => {
  try {
    const form = new FormData();
    const extension = data.file.split('.').pop()?.toLowerCase();
    const fileName = `${data.userName}_voice_bite`;
    if (fileName && extension) {
      form.append('voicebite', {
        name: `${fileName}.${extension}`,
        type: `audio/${extension}`,
        uri: data.file,
      });
    }
    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.post(Backend.uploadPost, form, config);
    return res.data;
  } catch (err: any) {
    console.log(err.response?.data);
    throw new Error(err?.message);
  }
};

export default uploadBite;
