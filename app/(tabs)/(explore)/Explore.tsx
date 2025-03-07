import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import FullScreenView from '@/components/FullScreenView';
import { FlashList } from '@shopify/flash-list';
import { useDispatch, useSelector } from 'react-redux';
import { voiceBiteThunk } from '@/redux/features/voiceBites/VoiceBiteSlice';
import VoiceBites from '@/components/VoiceBitesCard';
import NoPostAvailable from '@/components/NoPostAvalable';
import { DeviceHeight, DeviceWidth } from '@/constants/dimensions';
import CustomLoadingPage from '@/components/CustomLoadingPage';

const Explore = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { userName } = user.userInfo;
  const voiceBite = useSelector((state: any) => state.voiceBite);
  const { allBites, isLoading } = voiceBite;
  const { posts } = allBites;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userName) {
      dispatch(voiceBiteThunk(userName));
    }
  }, [userName]);

  if (isLoading) return <CustomLoadingPage />;

  return (
    <FullScreenView>
      <FlashList
        data={posts}
        renderItem={({ item }: any) => (
          <VoiceBites
            username={item?.user?.userName}
            avatar={item?.user?.avatar}
            fileName={item?.file}
          />
        )}
        estimatedItemSize={30}
        ListEmptyComponent={() => (
          <View style={styles.contaiiner}>
            <NoPostAvailable />
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
