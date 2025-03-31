import axios from 'axios';
import { Backend } from '@/config';
import { Audio } from 'react-native-compressor';

interface Props {
  userId: string;
  token: string;
  file: string;
}

const uploadBite = async (data: Props) => {
  try {
    if (data.file) {
      const form = new FormData();
      const compressedAudio = await Audio.compress(data.file, {
        quality: 'medium',
      });
      const extension = compressedAudio?.split('.').pop()?.toLowerCase();
      const fileName = `${data.userId}_voice_bite`;
      if (fileName && extension) {
        form.append('voicebite', {
          name: `${fileName}.${extension}`,
          type: `audio/${extension}`,
          uri: compressedAudio,
        });
      }
      const config = {
        headers: {
          Authorization: `Bearer ${data.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      if ([...form.entries()].length > 0) {
        const res = await axios.post(Backend.uploadPost, form, config);
        return res.data;
      }
    }

    return {};
  } catch (err: any) {
    console.log(err.response?.data);
    throw new Error(err?.message);
  }
};

export default uploadBite;
