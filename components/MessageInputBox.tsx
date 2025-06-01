import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
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
  const [inputHeight, setInputHeight] = useState(40);

  const { token, otherChatParticipant } = useCentralStore(
    useShallow((state) => ({
      token: state.user.token,
      otherChatParticipant: state.otherChatParticipant,
    }))
  );

  useEffect(() => {
    if (newMessage) {
      NotificationSocket.emit('message', {
        userId: otherChatParticipant.userId,
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
          receiverId: otherChatParticipant.userId,
          message,
          messageType: 'text',
        });
        setNewMessage(newMessage);
        setMessage('');
      } catch (err) {
        console.log(err);
      } finally {
        setIsSending(false);
        setInputHeight(40);
      }
    }
  };

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      style={styles.container}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder='Message...'
          placeholderTextColor={Color.gray.oneHundred}
          multiline
          maxLength={1000}
          style={[
            styles.input,
            { height: Math.min(120, Math.max(40, inputHeight)) },
          ]}
          onContentSizeChange={(e) =>
            setInputHeight(e.nativeEvent.contentSize.height)
          }
          textAlignVertical='center'
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
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Color.black.twoHundred,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: Font.pRegular,
    color: Color.white,
    paddingRight: 10,
  },
  sendButton: {
    padding: 5,
  },
});
