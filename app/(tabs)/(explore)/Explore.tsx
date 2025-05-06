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
  const { allBites, isLoading, isError } = useCentralStore(
    useShallow((state) => ({
      allBites: state.allBites,
      isLoading: state.voiceBiteStatus.isLoading,
      isError: state.voiceBiteStatus.isError,
    }))
  );

  const currendPageRef = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch next page efficiently
  const fetchNextPage = useCallback(async () => {
    if (
      allBites.totalPages > currendPageRef.current &&
      !loadingMore &&
      !refreshing
    ) {
      setLoadingMore(true);
      currendPageRef.current++;

      const res = await fetchAllBites({
        page: currendPageRef.current,
        limit: 10,
      });

      if (res.posts?.length) {
        useCentralStore.setState((prev) => ({
          allBites: {
            totalPages: res.totalPages,
            posts: [...prev.allBites.posts, ...res.posts],
          },
        }));
      }
      setLoadingMore(false);
    }
  }, [allBites.totalPages]);

  const refreshControl = async () => {
    try {
      currendPageRef.current = 1;
      setRefreshing(true);
      const res = await fetchAllBites({
        page: 1,
        limit: 10,
      });
      if (res.posts?.length) {
        useCentralStore.setState((prev) => ({
          allBites: {
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
        ownerId={item?.user?._id}
        voiceBiteId={item?._id}
        name={item?.user?.name}
        avatar={item?.user?.avatar}
        file={item?.file}
      />
    ),
    []
  );

  return (
    <FullScreenView>
      <FlashList
        data={allBites.posts}
        numColumns={2}
        renderItem={renderItem}
        estimatedItemSize={300}
        ListEmptyComponent={
          <View style={styles.container}>
            <NoPostAvailable isLoading={isLoading || isError} />
          </View>
        }
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

export default Explore;

const styles = StyleSheet.create({
  container: {
    height: DeviceHeight - 50,
    width: DeviceWidth,
    flex: 1,
    marginHorizontal: 100,
  },
});
