import { Text, View } from 'react-native';
import FullScreenView from '@/components/FullScreenView';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import fetchUserPost from '@/libs/api/fetchUserPost';
import { FlashList } from '@shopify/flash-list';
import ProfileInfo from '@/components/ProfileInfo';
import VoiceBites from '@/components/VoiceBitesCard';
import NoPostAvailable from '@/components/NoPostAvalable';
import { voiceBiteThunk } from '@/redux/features/voiceBites/VoiceBiteSlice';

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { userName, avatar } = user.userInfo;
  const voiceBite = useSelector((state: any) => state.voiceBite);
  const { userBites, isLoading } = voiceBite;
  const { posts } = userBites;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userName) {
      dispatch(voiceBiteThunk(userName));
    }
  }, [userName]);

  return (
    <FullScreenView>
      <FlashList
        ListHeaderComponent={() => <ProfileInfo posts={posts.length} />}
        data={posts}
        renderItem={({ item }: any) => (
          <VoiceBites
            username={userName}
            avatar={avatar}
            fileName={item?.file}
          />
        )}
        estimatedItemSize={30}
        ListEmptyComponent={NoPostAvailable()}
      />
    </FullScreenView>
  );
};

export default Profile;
