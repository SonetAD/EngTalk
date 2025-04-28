import axios from 'axios';
import { Backend } from '@/config';

const getIcServer = async (authToken: string) => {
  try {
    const res = await axios(Backend.iceServerURL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default getIcServer;
