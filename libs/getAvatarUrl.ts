import { Backend } from '@/config';

interface Props {
  src: string;
  stockAvatar: string;
}
const getAvatarUrl = ({ src, stockAvatar }: Props) => {
  const avatarImageSrc = src
    ? `${Backend.baseURL}/public/avatars/${src}`
    : `${Backend.baseURL}/default/avatars/${stockAvatar}`;
  return avatarImageSrc;
};

export default getAvatarUrl;
