import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  Color,
  DeviceHeight,
  DeviceWidth,
  Font,
  ImageBlurHash,
} from '@/constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { Backend } from '@/config';
import { Image } from 'expo-image';

interface Props {
  name: string;
  avatar: { src: string; default: boolean };
}

const ChatHeaderComponent = ({ name, avatar }: Props) => {
  const avatarImageSrc = avatar?.default
    ? `${Backend.baseURL}/default/avatars/${avatar?.src}`
    : `${Backend.baseURL}/default/avatars/${avatar?.src}`;

  return (
    <View style={styles.container}>
      <Image
        source={avatarImageSrc}
        placeholder={ImageBlurHash}
        contentFit='cover'
        transition={1000}
        style={styles.avatar}
      />

      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default ChatHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  name: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
});
