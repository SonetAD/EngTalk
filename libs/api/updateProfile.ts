import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  token: string;
  userName?: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

const updateProfile = async (data: Props) => {
  try {
    const form = new FormData();

    if (data.userName) form.append('userName', data.userName);
    if (data.name) form.append('name', data.name);
    if (data.email) form.append('email', data.email);
    if (data.password) form.append('password', data.password);

    if (data.avatar) {
      const extension = data.avatar.split('.').pop()?.toLowerCase();
      const fileName = `${data.userName}_profile_picture`;

      if (extension) {
        form.append('avatar', {
          name: `${fileName}.${extension}`,
          type: `image/${extension}`,
          uri: data.avatar,
        });
      }
    }

    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post(Backend.updateProfileURL, form, config);
    return res.data;
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    throw new Error(err?.message);
  }
};

export default updateProfile;
