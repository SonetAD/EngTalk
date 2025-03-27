import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import CustomAvatar from './CustomAvatar';
import { router } from 'expo-router';

const ChatHeaderComponent = () => {
  const {
    otherChatParticipantUserId,
    otherChatParticipantName,
    otherChatParticipantAvatar,
    setOtherUser,
  } = useCentralStore(
    useShallow((state) => ({
      otherChatParticipantName: state.otherChatParticipant.name,
      otherChatParticipantUserId: state.otherChatParticipant.userId,
      otherChatParticipantAvatar: state.otherChatParticipant.avatar,
      setOtherUser: state.setOtherUser,
    }))
  );

  const viewProfile = () => {
    setOtherUser(otherChatParticipantUserId);
    router.push('/OtherProfile');
  };
  return (
    <Pressable onPress={viewProfile}>
      <View style={styles.container}>
        <CustomAvatar
          avatar={otherChatParticipantAvatar}
          avatarStyle={styles.avatar}
        />

        <Text style={styles.name}>{otherChatParticipantName}</Text>
      </View>
    </Pressable>
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
  },

  name: {
    color: Color.white,
    fontSize: 17,
    fontFamily: Font.pSemiBold,
  },
});
