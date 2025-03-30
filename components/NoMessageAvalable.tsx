import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomAvatar from './CustomAvatar';
import { Color, DeviceWidth, Font } from '@/constants/constants';
import CustomButton from './CustomButton';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { router } from 'expo-router';

const NoMessageAvalable = () => {
  const {
    otherChatParticipantUserId,
    otherChatParticipantName,
    otherChatParticipantAvatar,
    setOtherUser,
  } = useCentralStore(
    useShallow((state) => ({
      otherChatParticipantUserId: state.otherChatParticipant.userId,
      otherChatParticipantName: state.otherChatParticipant.name,
      otherChatParticipantAvatar: state.otherChatParticipant.avatar,
      setOtherUser: state.setOtherUser,
    }))
  );

  const viewProfile = () => {
    setOtherUser({userId:otherChatParticipantUserId, goBackRoute: '/Chat'});
    router.navigate('/OtherProfile');
  };
  return (
    <View style={styles.container}>
      <CustomAvatar avatar={otherChatParticipantAvatar} />
      <Text style={styles.name}>{otherChatParticipantName}</Text>
      <CustomButton
        text='View Profile'
        handlePress={viewProfile}
        containerStyle={styles.btn}
        textStyle={styles.text}
        feedBackOff={true}
      />
    </View>
  );
};

export default NoMessageAvalable;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: Font.pSemiBold,
    color: Color.white,
  },
  btn: {
    backgroundColor: '',
    width: DeviceWidth * 0.4,
  },
  text: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    fontSize: 15,
  },
});
