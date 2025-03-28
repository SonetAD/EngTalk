import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  token: string;
  userId:string;
  userName?: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: {
    src: string;
    stockAvatar: string;
  };
}

const updateProfile = async (data: Props) => {
  try {
    const form = new FormData();

    if (data.userName) form.append('userName', data.userName);
    if (data.name) form.append('name', data.name);
    if (data.email) form.append('email', data.email);
    if (data.password) form.append('password', data.password);

    if (data?.avatar?.src) {
      const extension = data?.avatar?.src.split('.').pop()?.toLowerCase();
      const fileName = `${data.userId}_profile_picture`;

      if (extension) {
        form.append('avatar', {
          name: `${fileName}.${extension}`,
          type: `image/${extension}`,
          uri: data.avatar.src,
        });
      }
    }

    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    if ([...form.entries()].length > 0) {
      const res = await axios.put(Backend.updateProfileURL, form, config);
      return res.data;
    }
    return {};
  } catch (err: any) {
    console.log(err);
    throw new Error(err?.message);
  }
};

export default updateProfile;
