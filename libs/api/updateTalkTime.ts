import axios from 'axios';
import { Backend } from '@/config';

interface Props {
  talkTime: number | null;
  token: string;
}

const updateTalkTime = async ({ talkTime, token }: Props) => {
  try {
    let stat;
    if (talkTime) {
      stat = await axios.put(
        Backend.statURL,
        { talkTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      stat = await axios.get(Backend.statURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return stat.data;
  } catch (err) {
    throw 'Something went wrong';
  }
};

export default updateTalkTime;
