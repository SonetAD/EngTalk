import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FullScreenView from '@/components/FullScreenView';
import { FlashList } from '@shopify/flash-list';
import VoiceBiteCard from '@/components/VoiceBiteCard';
import NoPostAvailable from '@/components/NoPostAvalable';
import { DeviceHeight, DeviceWidth } from '@/constants/dimensions';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import CustomLoadingPage from '@/components/CustomLoadingPage';
import fetchAllBites from '@/libs/api/fetchAllBite';
import {Color} from '@/constants/constants';

const Explore = () => {
  const { userName, allBites, isLoading, getVoiceBite } = useCentralStore(
    useShallow((state) => ({
      userName: state.user.userInfo.userName,
      avatar: state.user.userInfo.avatar,
      allBites: state.allBites,
      isLoading: state.voiceBiteStatus.isLoading,
      getVoiceBite: state.getVoiceBite,
    }))
  );
  const startScrollingRef = useRef(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const currendPageRef = useRef(1);

  const [biteStore, setBiteStore] = useState<any>({
    totalPages: 0,
    posts: [],
  });

  useEffect(() => {
    if (userName) {
      getVoiceBite({ userName });
    }
  }, [userName]);

  useEffect(() => {
    setBiteStore((prev:any) => ({
      totalPages: allBites.totalPages,
      posts: allBites.posts,
    }));
  }, [allBites]);

  const onScrollEnd = async () => {
    if (
      startScrollingRef.current &&
      biteStore.totalPages > currendPageRef.current
    ) {
      console.log(biteStore.totalPages);
      setLoadingMore(true);
      currendPageRef.current++;
      const res = await fetchAllBites({
        page: currendPageRef.current,
        limit: 10,
      });
      const newPosts: any = res.posts || [];
      setBiteStore((prev:any) => ({
        totalPages: res.totalPages,
        posts: [...prev.posts, ...newPosts],
      }));

      setLoadingMore(false);
    } else {
      currendPageRef.current = 1;
    }
  };

  return (
    <FullScreenView>
      <FlashList
        data={biteStore.posts}
        renderItem={({ item }: any) => (
          <VoiceBiteCard
            username={item?.user?.userName}
            avatar={item?.user?.avatar}
            fileName={item?.file}
          />
        )}
        estimatedItemSize={30}
        ListEmptyComponent={() => (
          <View style={styles.contaiiner}>
            <NoPostAvailable isLoading={isLoading} />
          </View>
        )}
        onEndReached={onScrollEnd}
        onEndReachedThreshold={0.001}
        onMomentumScrollBegin={() => {
          startScrollingRef.current = true;
        }}
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
  contaiiner: {
    height: DeviceHeight - 50,
    width: DeviceWidth,
    flex: 1,
  },
});
