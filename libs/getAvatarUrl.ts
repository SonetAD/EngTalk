import { Backend } from '@/config';

interface Props {
  default: boolean;
  src: string;
}
const getAvatarUrl = (avatar: Props) => {
  const avatarImageSrc = avatar?.default
    ? `${Backend.baseURL}/default/avatars/${avatar?.src}`
    : `${Backend.baseURL}/public/avatars/${avatar?.src}`;

  return avatarImageSrc;
};

export default getAvatarUrl;
