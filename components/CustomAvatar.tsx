import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { ImageBlurHash } from '@/constants/constants';
import getAvatarUrl from '@/libs/getAvatarUrl';

interface Props {
  avatar: {
    src: any;
    stockAvatar: any;
  };
  avatarStyle?: {};
  customSrc?: boolean;
}

const CustomAvatar = ({ avatar, avatarStyle, customSrc }: Props) => {
  const avatarImageSrc = getAvatarUrl(avatar);
  return (
    <Image
      source={customSrc ? avatar.src : avatarImageSrc}
      placeholder={ImageBlurHash}
      contentFit='cover'
      transition={1000}
      style={[styles.avatar, avatarStyle]}
    />
  );
};

export default CustomAvatar;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
