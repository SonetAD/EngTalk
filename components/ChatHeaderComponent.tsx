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
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import getAvatarUrl from '@/libs/getAvatarUrl';

const ChatHeaderComponent = () => {
  const { otherChatParticipantName, otherChatParticipantAvatar } =
    useCentralStore(
      useShallow((state) => ({
        otherChatParticipantName: state.otherChatParticipant.name,
        otherChatParticipantAvatar: state.otherChatParticipant.avatar,
      }))
    );

  const avatarImageSrc = getAvatarUrl(otherChatParticipantAvatar);

  return (
    <View style={styles.container}>
      <Image
        source={avatarImageSrc}
        placeholder={ImageBlurHash}
        contentFit='cover'
        transition={1000}
        style={styles.avatar}
      />

      <Text style={styles.name}>{otherChatParticipantName}</Text>
    </View>
  );
};

export default ChatHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    gap: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },

  name: {
    color: Color.white,
    fontSize: 17,
    fontFamily: Font.pSemiBold,
  },
});
