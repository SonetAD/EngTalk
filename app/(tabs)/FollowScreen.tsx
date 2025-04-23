import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FullScreenView from '@/components/FullScreenView';
import { useLocalSearchParams } from 'expo-router';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { FlashList } from '@shopify/flash-list';
import FollowUserCard from '@/components/FollowUserCard';

const FollowScreen = () => {
  const { followers, following } = useCentralStore(
    useShallow((state) => ({
      followers: state.user.userInfo.followers,
      following: state.user.userInfo.following,
    }))
  );
  const { screenName } = useLocalSearchParams();
  return (
    <FullScreenView>
      <FlashList
        data={screenName === 'followers' ? followers : following}
        renderItem={({ item }) => <FollowUserCard userId={item} />}
        estimatedItemSize={60}
      />
    </FullScreenView>
  );
};

export default FollowScreen;

const styles = StyleSheet.create({});
