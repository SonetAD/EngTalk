import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import FullScreenView from '@/components/FullScreenView';
import MessageInputBox from '@/components/MessageInputBox';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { FlashList } from '@shopify/flash-list';
import MessageBubble from '@/components/MessageBubble';
import { NotificationSocket } from '@/libs/Socket';
import CustomLoadingPage from '@/components/CustomLoadingPage';
import fetchConversation from '@/libs/api/fetchConversation';
import { Color } from '@/constants/constants';
import NoMessageAvalable from '@/components/NoMessageAvalable';

const Chat = () => {
  const {
    token,
    messages,
    totalConversationPages,
    isLoading,
    otherChatParticipantUserName,
  } = useCentralStore(
    useShallow((state) => ({
      token: state.user.token,
      messages: state.messages,
      isLoading: state.conversationStatus.isLoading,
      totalConversationPages: state.totalConversationPages,
      otherChatParticipantUserName: state.otherChatParticipant.userName,
    }))
  );
  const currendPageRef = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    NotificationSocket.on('message', ({ userName, message }) => {
      console.log(userName);
      console.log(otherChatParticipantUserName);
      if (userName === otherChatParticipantUserName) {
        useCentralStore.setState((prev) => ({
          messages: [message, ...prev.messages],
        }));
      }
    });

    return () => {
      NotificationSocket.off('message');
    };
  }, [otherChatParticipantUserName]);

  const loadMoreMessage = useCallback(async () => {
    if (totalConversationPages > currendPageRef.current && !loadingMore) {
      setLoadingMore(true);
      currendPageRef.current++;

      const res = await fetchConversation({
        token,
        otherUserName: otherChatParticipantUserName,
        page: currendPageRef.current,
        limit: 15,
      });

      if (res.messages?.length) {
        useCentralStore.setState((prev) => ({
          messages: [...res.messages, ...prev.messages],
        }));
      }
      setLoadingMore(false);
    }
  }, [token, otherChatParticipantUserName, totalConversationPages]);

  return (
    <FullScreenView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
        style={styles.keyboardAvoiding}
      >
        <View style={styles.container}>
          <View style={styles.listContainer}>
            {isLoading ? (
              <CustomLoadingPage />
            ) : (
              <FlashList
                data={messages}
                renderItem={({ item }) => <MessageBubble message={item} />}
                estimatedItemSize={60}
                contentContainerStyle={styles.listContent}
                keyboardShouldPersistTaps='handled'
                inverted={messages.length > 0}
                onEndReached={loadMoreMessage}
                ListFooterComponent={
                  loadingMore ? (
                    <ActivityIndicator
                      size='large'
                      color={Color.secondary.default}
                    />
                  ) : null
                }
                ListEmptyComponent={NoMessageAvalable}
              />
            )}
          </View>

          {/* Input box remains at the bottom */}
          <MessageInputBox />
        </View>
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
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 20,
  },
});
