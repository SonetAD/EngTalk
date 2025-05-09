import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import CustomAvatar from './CustomAvatar';
import { router } from 'expo-router';
import CustomBrightIcon from './CustomBrightIcon';
import NameComponent from './NameComponent';

const ChatHeaderComponent = () => {
  const {
    otherChatParticipantUserId,
    otherChatParticipantName,
    otherChatParticipantAvatar,
    otherChatParticipantIsBlueTicked,
    setOtherUser,
  } = useCentralStore(
    useShallow((state) => ({
      otherChatParticipantName: state.otherChatParticipant.name,
      otherChatParticipantUserId: state.otherChatParticipant.userId,
      otherChatParticipantAvatar: state.otherChatParticipant.avatar,
      otherChatParticipantIsBlueTicked: state.otherChatParticipant.isBlueTicked,
      setOtherUser: state.setOtherUser,
    }))
  );

  const viewProfile = () => {
    setOtherUser({ userId: otherChatParticipantUserId, goBackRoute: '/Chat' });
    router.push('/OtherProfile');
  };

  return (
    <Pressable onPress={viewProfile}>
      <View style={styles.container}>
        <Pressable onPress={() => router.replace('/Inbox')}>
          <CustomBrightIcon name='arrow-back-outline' />
        </Pressable>
        <CustomAvatar
          avatar={otherChatParticipantAvatar}
          avatarStyle={styles.avatar}
        />

        <NameComponent
          name={otherChatParticipantName}
          isBlueTicked={otherChatParticipantIsBlueTicked}
          fontStyle={styles.name}
          iconSize={18}
        />
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
    fontSize: 17,
    fontFamily: Font.pSemiBold,
  },
});
