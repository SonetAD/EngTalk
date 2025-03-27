import FullScreenView from '@/components/FullScreenView';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import ProfileInfo from '@/components/ProfileInfo';
import VoiceBiteCard from '@/components/VoiceBiteCard';
import NoPostAvailable from '@/components/NoPostAvalable';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import fetchUserBite from '@/libs/api/fetchUserBite';
import { ActivityIndicator } from 'react-native';
import { Color } from '@/constants/constants';

const Profile = () => {
  const {  userBites,userId, isLoading } = useCentralStore(
    useShallow((state) => ({
      userId: state.user.userInfo.userId,
      userBites: state.userBites,
      isLoading: state.voiceBiteStatus.isLoading,
    }))
  );

  const currendPageRef = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch next page efficiently
  const fetchNextPage = useCallback(async () => {
    if (
      userBites.totalPages > currendPageRef.current &&
      !loadingMore &&
      !refreshing
    ) {
      setLoadingMore(true);
      currendPageRef.current++;

      const res = await fetchUserBite({
        userId,
        page: currendPageRef.current,
        limit: 10,
      });

      if (res?.posts?.length > 0) {
        useCentralStore.setState((prev) => ({
          userBites: {
            totalPages: res.totalPages,
            posts: [...prev.userBites.posts, ...res.posts],
            totalPosts: res.totalPosts,
          },
        }));
      }
      setLoadingMore(false);
    }
  }, [userBites.totalPages]);

  const refreshControl = async () => {
    try {
      currendPageRef.current = 1;
      setRefreshing(true);
      const res = await fetchUserBite({
        userId,
        page: 1,
        limit: 10,
      });
      if (res.posts?.length) {
        useCentralStore.setState((prev) => ({
          userBites: {
            totalPages: res.totalPages,
            posts: res.posts,
            totalPosts: res.totalPosts,
          },
        }));
      }
      setRefreshing(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Memoized render item function
  const renderItem = useCallback(
    ({ item }: any) => (
      <VoiceBiteCard
        username={item?.user?.userName}
        name={item?.user?.name}
        avatar={item?.user?.avatar}
        fileName={item?.file}
      />
    ),
    []
  );

  const headerComponent = useCallback(() => <ProfileInfo />, []);

  return (
    <FullScreenView>
      <FlashList
        ListHeaderComponent={headerComponent}
        data={userBites.posts}
        numColumns={2}
        renderItem={renderItem}
        estimatedItemSize={300}
        ListEmptyComponent={<NoPostAvailable isLoading={isLoading} />}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.3}
        onRefresh={refreshControl}
        refreshing={refreshing}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size='large'
              color={Color.secondary.default}
            />
          ) : null
        }
      />
    </FullScreenView>
  );
};

export default Profile;
