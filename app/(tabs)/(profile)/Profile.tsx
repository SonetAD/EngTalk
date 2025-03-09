import FullScreenView from '@/components/FullScreenView';
import { useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import ProfileInfo from '@/components/ProfileInfo';
import VoiceBiteCard from '@/components/VoiceBiteCard';
import NoPostAvailable from '@/components/NoPostAvalable';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';

const Profile = () => {
  const { userName, avatar, posts, getVoiceBite } = useCentralStore(
    useShallow((state) => ({
      userName: state.user.userInfo.userName,
      avatar: state.user.userInfo.avatar,
      posts: state.userBites.posts,
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
        ListHeaderComponent={() => <ProfileInfo posts={posts.length} />}
        data={posts}
        renderItem={({ item }: any) => (
          <VoiceBiteCard
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
