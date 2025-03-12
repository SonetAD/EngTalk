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
    if (allBites.totalPages > currendPageRef.current) {
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
        username={item?.user?.userName}
        name={item?.user?.name}
        avatar={item?.user?.avatar}
        fileName={item?.file}
      />
    ),
    []
  );

  return (
    <FullScreenView>
      <FlashList
        data={allBites.posts}
        renderItem={renderItem}
        estimatedItemSize={50}
        ListEmptyComponent={
          <View style={styles.container}>
            <NoPostAvailable isLoading={isLoading} />
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
  },
});
