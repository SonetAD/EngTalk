import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import FullScreenView from '@/components/FullScreenView';
import { FlashList } from '@shopify/flash-list';
import VoiceBiteCard from '@/components/VoiceBiteCard';
import NoPostAvailable from '@/components/NoPostAvalable';
import { DeviceHeight, DeviceWidth } from '@/constants/dimensions';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import CustomLoadingPage from '@/components/CustomLoadingPage';

const Explore = () => {
  const { userName, posts, isLoading, getVoiceBite } = useCentralStore(
    useShallow((state) => ({
      userName: state.user.userInfo.userName,
      avatar: state.user.userInfo.avatar,
      posts: state.allBites.posts,
      isLoading: state.voiceBiteStatus.isLoading,
      getVoiceBite: state.getVoiceBite,
    }))
  );

  useEffect(() => {
    if (userName) {
      getVoiceBite({ userName });
    }
  }, [userName]);

  return (
    <FullScreenView>
      <FlashList
        data={posts}
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
      />
    </FullScreenView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  contaiiner: {
    height: DeviceHeight - 50,
    width: DeviceWidth,
  },
});
