import {
  KeyboardAvoidingView,
  Platform,
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
import deleteMessage from '@/libs/api/deleteMessage';

const Chat = () => {
  const {
    token,
    messages,
    conversationId,
    setReadStatus,
    totalConversationPages,
    isLoading,
    otherChatParticipantUserId,
    getConversation,
  } = useCentralStore(
    useShallow((state) => ({
      token: state.user.token,
      messages: state.messages,
      setReadStatus: state.setReadStatus,
      conversationId: state.conversationId,
      isLoading: state.conversationStatus.isLoading,
      totalConversationPages: state.totalConversationPages,
      otherChatParticipantUserId: state.otherChatParticipant.userId,
      getConversation: state.getConversation,
    }))
  );
  const currendPageRef = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);
  let checkMesageDuplication = '';

  useEffect(() => {
    if (otherChatParticipantUserId) {
      NotificationSocket.on('message', ({ userId, message }) => {
        if (userId === otherChatParticipantUserId) {
          if (message._id === checkMesageDuplication) return;
          checkMesageDuplication = message._id;
          useCentralStore.setState((prev) => ({
            messages: [message, ...prev.messages],
          }));
        }
      });
    }
  }, [otherChatParticipantUserId]);

  useEffect(() => {
    if (conversationId) {
      setReadStatus(conversationId);
    }
  }, [conversationId]);

  const loadMoreMessage = useCallback(async () => {
    if (totalConversationPages > currendPageRef.current && !loadingMore) {
      setLoadingMore(true);
      currendPageRef.current++;

      const res = await fetchConversation({
        token,
        userId: otherChatParticipantUserId,
        page: currendPageRef.current,
        limit: 15,
      });

      if (res.messages?.length) {
        useCentralStore.setState((prev) => ({
          messages: [...prev.messages, ...res.messages],
        }));
      }
      setLoadingMore(false);
    }
  }, [token, otherChatParticipantUserId, totalConversationPages]);

  const handleDeleteMessage = async (messageId: string) => {
    await deleteMessage({
      token,
      messageId,
    });
    getConversation(otherChatParticipantUserId);
  };

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
                renderItem={({ item }: { item: any }) => (
                  <MessageBubble
                    message={item}
                    handleDeleteMessage={handleDeleteMessage}
                  />
                )}
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
