import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FullScreenView from '@/components/FullScreenView';
import { useLocalSearchParams } from 'expo-router';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { FlashList } from '@shopify/flash-list';
import FollowUserCard from '@/components/FollowUserCard';
import NoFollowFound from '@/components/NoFollowFound';

const Following = () => {
  const { myUserId, myFollowing, otherUserFollowing } = useCentralStore(
    useShallow((state) => ({
      myUserId: state.user.userInfo.userId,
      myFollowing: state.user.userInfo.following,
      otherUserFollowing: state.otherUser.following,
    }))
  );
  const { userId } = useLocalSearchParams();
  const isMe = userId === myUserId;
  return (
    <FullScreenView>
      <FlashList
        data={isMe ? myFollowing : otherUserFollowing}
        renderItem={({ item }) => <FollowUserCard userId={item} />}
        estimatedItemSize={60}
        ListEmptyComponent={() => <NoFollowFound text='No Following' />}
      />
    </FullScreenView>
  );
};

export default Following;

const styles = StyleSheet.create({});
