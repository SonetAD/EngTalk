import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color, Font } from '@/constants/constants';

const MessageInputBox = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim().length > 0) {
      console.log('Sent:', message);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Message...'
              placeholderTextColor={Color.gray.oneHundred}
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={styles.sendButton}
            >
              <Ionicons
                name='send'
                size={24}
                color='#007AFF'
              />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default MessageInputBox;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inner: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.black.twoHundred,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Color.white,
    fontFamily :Font.pRegular
  },
  sendButton: {
    marginLeft: 10,
  },
});
