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
import NoConversationAvalable from '@/components/NoConversationAvalable';

const Inbox = () => {
  const { inbox, isLoading } = useCentralStore(
    useShallow((state) => ({
      inbox: state.inbox,
      isLoading: state.inboxStatus.isLoading,
    }))
  );

  const [loadMore, setLoadMore] = useState(false);

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
            loadMore ? (
              <ActivityIndicator
                size='large'
                color={Color.secondary.default}
              />
            ) : null
          }
          ListEmptyComponent={NoConversationAvalable}
        />
      )}
    </FullScreenView>
  );
};

export default Inbox;

const styles = StyleSheet.create({});
