import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FullScreenView from '@/components/FullScreenView';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import fetchInbox from '@/libs/api/fetchInbox';
import CustomLoadingPage from '@/components/CustomLoadingPage';
import { FlashList } from '@shopify/flash-list';
import { Color } from '@/constants/constants';
import ConversationCard from '@/components/ConversationCard';

const Inbox = () => {
  const { token } = useCentralStore(
    useShallow((state) => ({
      token: state.user.token,
    }))
  );

  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          setIsLoading(true);
          const inbox = await fetchInbox({ token });
          setConversations(inbox.conversations);
          console.log(inbox.conversations[0]);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [token]);
  return (
    <FullScreenView>
      {isLoading ? (
        <CustomLoadingPage />
      ) : (
        <FlashList
          data={conversations}
          renderItem={({ item }) => <ConversationCard conversation={item} />}
          estimatedItemSize={60}
          ListFooterComponent={
            loadMore ? (
              <ActivityIndicator
                size='large'
                color={Color.secondary.default}
              />
            ) : null
          }
        />
      )}
    </FullScreenView>
  );
};

export default Inbox;

const styles = StyleSheet.create({});
