import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import FullScreenView from '@/components/FullScreenView';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import fetchInbox from '@/libs/api/fetchInbox';
import CustomLoadingPage from '@/components/CustomLoadingPage';
import { FlashList } from '@shopify/flash-list';
import { Color } from '@/constants/constants';
import ConversationCard from '@/components/ConversationCard';
import NoConversationAvalable from '@/components/NoConversationAvalable';

const Inbox = () => {
  const { token, inbox, inboxTotalPages, isLoading } = useCentralStore(
    useShallow((state) => ({
      token: state.user.token,
      inbox: state.inbox,
      inboxTotalPages: state.inboxTotalPages,
      isLoading: state.inboxStatus.isLoading,
    }))
  );

  const currendPageRef = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNextPage = useCallback(async () => {
    if (
      inboxTotalPages > currendPageRef.current &&
      !loadingMore &&
      !refreshing
    ) {
      setLoadingMore(true);
      currendPageRef.current++;

      const res = await fetchInbox({
        token,
        page: currendPageRef.current,
        limit: 10,
      });

      if (res.conversations?.length) {
        useCentralStore.setState((prev) => ({
          inbox: [...prev.inbox, ...res.conversations],
        }));
      }
      setLoadingMore(false);
    }
  }, [inboxTotalPages]);

  const refreshControl = async () => {
    try {
      currendPageRef.current = 1;
      setRefreshing(true);
      const res = await fetchInbox({
        token,
        page: 1,
        limit: 10,
      });
      if (res.conversations?.length) {
        useCentralStore.setState((prev) => ({
          inbox: [...res.conversations],
        }));
      }
      setRefreshing(false);
    } catch (err) {
      if (__DEV__) console.log(err);
    }
  };

  return (
    <FullScreenView>
      {isLoading ? (
        <CustomLoadingPage />
      ) : (
        <FlashList
          data={inbox}
          renderItem={({ item }) => <ConversationCard conversation={item} />}
          estimatedItemSize={60}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size='large'
                color={Color.secondary.default}
              />
            ) : null
          }
          onEndReached={fetchNextPage}
          onRefresh={refreshControl}
          refreshing={refreshing}
          ListEmptyComponent={NoConversationAvalable}
        />
      )}
    </FullScreenView>
  );
};

export default Inbox;

const styles = StyleSheet.create({});
