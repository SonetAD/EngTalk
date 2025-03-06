import { StyleSheet, Text, View } from 'react-native';
import FullScreenView from '@/components/FullScreenView';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import fetchUserPost from '@/libs/api/fetchUserPost';
import { FlashList } from '@shopify/flash-list';
import ProfileInfo from '@/components/ProfileInfo';
import VoiceBites from '@/components/VoiceBitesCard';
import NoPostAvailable from '@/components/NoPostAvalable';

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { userName, avatar } = user.userInfo;
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    (async () => {
      if (userName) {
        const getPosts = await fetchUserPost(userName);
        setPostList(getPosts);
      }
    })();
  }, [userName]);

  return (
    <FullScreenView>
      <FlashList
        ListHeaderComponent={() => <ProfileInfo posts={postList.length} />}
        data={postList}
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

const styles = StyleSheet.create({});
