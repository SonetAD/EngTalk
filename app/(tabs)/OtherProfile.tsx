import FullScreenView from '@/components/FullScreenView';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import VoiceBiteCard from '@/components/VoiceBiteCard';
import NoPostAvailable from '@/components/NoPostAvalable';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import fetchUserBite from '@/libs/api/fetchUserBite';
import { ActivityIndicator } from 'react-native';
import { Color } from '@/constants/constants';
import OtherProfileInfo from '@/components/OtherProfileInfo';

const OtherProfile = () => {
  const { userName, otherUser, userBites, isLoading, getVoiceBite } =
    useCentralStore(
      useShallow((state) => ({
        otherUser: state.otherUser,
        userName: state.user.userInfo.userName,
        name: state.user.userInfo.name,
        userBites: state.userBites,
        isLoading: state.voiceBiteStatus.isLoading,
        getVoiceBite: state.getVoiceBite,
      }))
    );

  const currendPageRef = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch initial data
  useEffect(() => {
    if (userName) {
      getVoiceBite({ userName });
    }
  }, [userName]);

  // Function to fetch next page efficiently
  const fetchNextPage = useCallback(async () => {
    if (userBites.totalPages > currendPageRef.current) {
      setLoadingMore(true);
      currendPageRef.current++;

      const res = await fetchUserBite({
        userName,
        page: currendPageRef.current,
        limit: 10,
      });
      setLoadingMore(false);

      if (res.posts?.length) {
        useCentralStore.setState((prev) => ({
          userBites: {
            totalPages: res.totalPages,
            posts: [...prev.userBites.posts, ...res.posts],
            totalBites: res.totalPosts,
          },
        }));
      }
    }
  }, [userBites.totalPages]);

  const refreshControl = async () => {
    try {
      currendPageRef.current = 1;
      setRefreshing(true);
      const res = await fetchUserBite({
        userName,
        page: 1,
        limit: 10,
      });
      if (res.posts?.length) {
        useCentralStore.setState((prev) => ({
          userBites: {
            totalPages: res.totalPages,
            posts: res.posts,
            totalBites: res.totalPosts,
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

  const headerComponent = useCallback(
    () => (
      <OtherProfileInfo
        posts={userBites.totalPosts}
        userName={otherUser}
      />
    ),
    [userBites.totalPages]
  );

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

export default OtherProfile;
