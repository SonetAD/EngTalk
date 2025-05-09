import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomAvatar from './CustomAvatar';
import { Color, DeviceWidth, Font } from '@/constants/constants';
import CustomButton from './CustomButton';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { router } from 'expo-router';
import NameComponent from './NameComponent';

const NoMessageAvalable = () => {
  const {
    otherChatParticipantUserId,
    otherChatParticipantName,
    otherChatParticipantAvatar,
    otherChatParticipantIsBlueTicked,

    setOtherUser,
  } = useCentralStore(
    useShallow((state) => ({
      otherChatParticipantUserId: state.otherChatParticipant.userId,
      otherChatParticipantName: state.otherChatParticipant.name,
      otherChatParticipantAvatar: state.otherChatParticipant.avatar,
      otherChatParticipantIsBlueTicked: state.otherChatParticipant.isBlueTicked,
      setOtherUser: state.setOtherUser,
    }))
  );

  const viewProfile = () => {
    setOtherUser({ userId: otherChatParticipantUserId, goBackRoute: '/Chat' });
    router.navigate('/OtherProfile');
  };
  return (
    <View style={styles.container}>
      <CustomAvatar avatar={otherChatParticipantAvatar} />
      <NameComponent
        name={otherChatParticipantName}
        isBlueTicked={otherChatParticipantIsBlueTicked}
        fontStyle={styles.name}
      />

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
    fontFamily: Font.pSemiBold,
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
