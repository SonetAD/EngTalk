import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import FullScreenView from '@/components/FullScreenView';
import MessageInputBox from '@/components/MessageInputBox';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { FlashList } from '@shopify/flash-list';
import MessageBubble from '@/components/MessageBubble';

const Chat = () => {
  const { messages } = useCentralStore(
    useShallow((state) => ({
      messages: state.messages,
    }))
  );

  return (
    <FullScreenView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
        style={styles.keyboardAvoiding}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <FlashList
              data={messages}
              renderItem={({ item }) => <MessageBubble message={item} />}
              estimatedItemSize={60}
              contentContainerStyle={styles.scrollView}
              keyboardShouldPersistTaps='handled'
              inverted
            />

            {/* Message input box always at the bottom */}
            <MessageInputBox />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </FullScreenView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    paddingVertical: 20,
  },
});
