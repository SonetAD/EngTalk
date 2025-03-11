import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import FullScreenView from '@/components/FullScreenView';
import { FlashList } from '@shopify/flash-list';
import VoiceBiteCard from '@/components/VoiceBiteCard';
import NoPostAvailable from '@/components/NoPostAvalable';
import { DeviceHeight, DeviceWidth } from '@/constants/dimensions';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import fetchAllBites from '@/libs/api/fetchAllBite';
import { Color } from '@/constants/constants';

const Explore = () => {
  const { userName, allBites, isLoading, getVoiceBite } = useCentralStore(
    useShallow((state) => ({
      userName: state.user.userInfo.userName,
      allBites: state.allBites,
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
      totalPages: allBites?.totalPages || 0,
      posts: allBites?.posts || [],
    }),
    [allBites]
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

      const res = await fetchAllBites({
        page: currendPageRef.current,
        limit: 10,
      });
      setLoadingMore(false);

      if (res.posts?.length) {
        useCentralStore.setState((prev) => ({
          allBites: {
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

  return (
    <FullScreenView>
      <FlashList
        data={biteStore.posts}
        renderItem={renderItem}
        estimatedItemSize={50}
        ListEmptyComponent={
          <View style={styles.container}>
            <NoPostAvailable isLoading={isLoading} />
          </View>
        }
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

export default Explore;

const styles = StyleSheet.create({
  container: {
    height: DeviceHeight - 50,
    width: DeviceWidth,
    flex: 1,
  },
});
