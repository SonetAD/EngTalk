import type { ImageStyle, StyleProp } from 'react-native';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Color, ImageBlurHash } from '@/constants/constants';
import getAvatarUrl from '@/libs/getAvatarUrl';
import { isLoading } from 'expo-font';

interface Props {
  avatar: {
    src: string;
    stockAvatar: string;
  };
  avatarStyle?: StyleProp<ImageStyle>;
  customSrc?: boolean;
}

const CustomAvatar = ({ avatar, avatarStyle, customSrc }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading)
    return (
      <ActivityIndicator
        color={Color.secondary.default}
        size='large'
      />
    );

  const avatarImageSrc = getAvatarUrl(avatar);
  return (
    <Image
      source={customSrc ? avatar.src : avatarImageSrc}
      placeholder={ImageBlurHash}
      contentFit='cover'
      transition={1000}
      style={[styles.avatar, avatarStyle]}
      onLoad={() => {
        if (isLoading) {
          setIsLoading(false);
        }
      }}
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
