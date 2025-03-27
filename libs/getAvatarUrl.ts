import { Backend } from '@/config';

interface Props {
  avatar: string;
  gender: string;
}
const getAvatarUrl = ({ avatar, gender }: Props) => {
  const defaultAvatar =
    gender === 'male' ? 'avatar_male.png' : 'avatar_female.png';
  const avatarImageSrc = avatar
    ? `${Backend.baseURL}/public/avatars/${avatar}`
    : `${Backend.baseURL}/default/avatars/${defaultAvatar}`;
  return avatarImageSrc;
};

export default getAvatarUrl;
