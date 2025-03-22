import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color, Font } from '@/constants/constants';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import sendMessage from '@/libs/api/sendMessage';
import { NotificationSocket } from '@/libs/Socket';

const MessageInputBox = () => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [newMessage, setNewMessage] = useState(null);

  const { token, otherChatParticipant } = useCentralStore(
    useShallow((state) => ({
      token: state.user.token,
      otherChatParticipant: state.otherChatParticipant,
    }))
  );

  useEffect(() => {
    if (newMessage) {
      NotificationSocket.emit('message', {
        otherUserName: otherChatParticipant.userName,
        message: newMessage,
      });
    }
  }, [newMessage]);

  const sendMessageFunction = async () => {
    if (message.trim().length > 0) {
      try {
        setIsSending(true);
        const newMessage = await sendMessage({
          token,
          receiver: otherChatParticipant.userName,
          message,
          messageType: 'text',
        });
        useCentralStore.setState((prev) => ({
          messages: [newMessage.message, ...prev.messages],
        }));
        setIsSending(false);
        setNewMessage(newMessage.message);
        setMessage('');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Message...'
          placeholderTextColor={Color.gray.oneHundred}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          onPress={sendMessageFunction}
          style={styles.sendButton}
          disabled={isSending}
        >
          {isSending ? (
            <ActivityIndicator
              size='small'
              color='#007AFF'
            />
          ) : (
            <Ionicons
              name='send'
              size={24}
              color='#007AFF'
            />
          )}
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default MessageInputBox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.black.twoHundred,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Color.white,
    fontFamily: Font.pRegular,
  },
  sendButton: {
    marginLeft: 10,
  },
});
