import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import FullScreenView from '@/components/FullScreenView';
import MessageInputBox from '@/components/MessageInputBox';

const Chat = () => {
  const { otherChatParticipant } = useCentralStore(
    useShallow((state) => ({
      otherChatParticipant: state.otherChatParticipant,
    }))
  );
  console.log(otherChatParticipant);

  return (
    <FullScreenView>
      <MessageInputBox />
    </FullScreenView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
