import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FullScreenView from '@/components/FullScreenView';
import { useLocalSearchParams } from 'expo-router';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { FlashList } from '@shopify/flash-list';
import FollowUserCard from '@/components/FollowUserCard';
import NoFollowFound from '@/components/NoFollowFound';

const Followers = () => {
  const { myUserId, myFollowers, otherUserFollowers } = useCentralStore(
    useShallow((state) => ({
      myUserId: state.user.userInfo.userId,
      myFollowers: state.user.userInfo.followers,
      otherUserFollowers: state.otherUser.followers,
    }))
  );
  const { userId } = useLocalSearchParams();
  const isMe = userId === myUserId;

  return (
    <FullScreenView>
      <FlashList
        data={isMe ? myFollowers : otherUserFollowers}
        renderItem={({ item }) => <FollowUserCard userId={item} />}
        estimatedItemSize={60}
        ListEmptyComponent={() => <NoFollowFound text='No Followers' />}
      />
    </FullScreenView>
  );
};

export default Followers;

const styles = StyleSheet.create({});
