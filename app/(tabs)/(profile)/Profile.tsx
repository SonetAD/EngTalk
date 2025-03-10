import FullScreenView from '@/components/FullScreenView';
import { useEffect, useRef, useState } from 'react';
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
  const { userName, avatar, userBites, isLoading, getVoiceBite } =
    useCentralStore(
      useShallow((state) => ({
        userName: state.user.userInfo.userName,
        avatar: state.user.userInfo.avatar,
        userBites: state.userBites,
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
    totalPosts:0
  });

  useEffect(() => {
    if (userName) {
      getVoiceBite({ userName });
    }
  }, [userName]);

  useEffect(() => {
    setBiteStore((prev: any) => ({
      totalPages: userBites.totalPages,
      posts: userBites.posts,
      totalPosts:userBites.totalPosts
    }));
  }, [userBites]);

  const onScrollEnd = async () => {
    if (
      startScrollingRef.current &&
      biteStore.totalPages > currendPageRef.current
    ) {
      setLoadingMore(true);
      try {
        currendPageRef.current++;
        const res = await fetchUserBite({
          userName: userName,
          page: currendPageRef.current,
          limit: 10,
        });
        const newPosts: any = res.posts || [];
        setBiteStore((prev: any) => ({
          totalPages: res.totalPages,
          posts: [...prev.posts, ...newPosts],
          totalPosts:res.totalPosts
        }));

        setLoadingMore(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      currendPageRef.current = 1;
    }
  };

  return (
    <FullScreenView>
      <FlashList
        ListHeaderComponent={() => (
          <ProfileInfo posts={biteStore.posts.length} />
        )}
        data={biteStore.posts}
        renderItem={({ item }: any) => (
          <VoiceBiteCard
            username={userName}
            avatar={avatar}
            fileName={item?.file}
          />
        )}
        estimatedItemSize={30}
        ListEmptyComponent={() => <NoPostAvailable isLoading={isLoading} />}
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

export default Profile;
