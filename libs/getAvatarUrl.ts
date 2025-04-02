interface Props {
  src: string;
  stockAvatar: string;
}

const getAvatarUrl = ({ src, stockAvatar }: Props) => {
  let defaultAvatar = '';
  if (stockAvatar === 'avatar_male.png') {
    defaultAvatar = require(`../assets/avatars/avatar_male.png`);
  } else {
    defaultAvatar = require(`../assets/avatars/avatar_female.png`);
  }

  const avatarImageSrc = src ? src : defaultAvatar;
  return avatarImageSrc;
};

export default getAvatarUrl;
