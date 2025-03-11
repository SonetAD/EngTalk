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
  const { userName, userBites, totalBites, isLoading, getVoiceBite } =
    useCentralStore(
      useShallow((state) => ({
        userName: state.user.userInfo.userName,
        userBites: state.userBites,
        totalBites: state.userBites.totalPosts,
        isLoading: state.voiceBiteStatus.isLoading,
        getVoiceBite: state.getVoiceBite,
      }))
    );

  const startScrollingRef = useRef(false);
  const currendPageRef = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Memoizing biteStore to avoid unnecessary re-renders
  const biteStore = useMemo(
    () => ({
      totalPages: userBites?.totalPages || 0,
      posts: userBites?.posts || [],
    }),
    [userBites]
  );

  // Fetch initial data
  useEffect(() => {
    if (userName) {
      getVoiceBite({ userName });
    }
  }, [userName]);

  // Function to fetch next page efficiently
  const fetchNextPage = useCallback(async () => {
    if (
      startScrollingRef.current &&
      biteStore.totalPages > currendPageRef.current
    ) {
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
            posts: [...prev.allBites.posts, ...res.posts],
          },
        }));
      }
    }
  }, [biteStore.totalPages]);

  // Memoized render item function
  const renderItem = useCallback(
    ({ item }: any) => (
      <VoiceBiteCard
        username={item?.user?.userName}
        avatar={item?.user?.avatar}
        fileName={item?.file}
      />
    ),
    []
  );

  const headerComponent = useCallback(
    ({ item }: any) => <ProfileInfo posts={totalBites} />,
    [totalBites]
  );

  return (
    <FullScreenView>
      <FlashList
        ListHeaderComponent={headerComponent}
        data={biteStore.posts}
        renderItem={renderItem}
        estimatedItemSize={50}
        ListEmptyComponent={<NoPostAvailable isLoading={isLoading} />}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => (startScrollingRef.current = true)}
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
