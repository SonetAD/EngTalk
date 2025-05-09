import { StyleSheet, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import getUserInfo from '@/libs/api/userInfo';
import { Color, Font } from '@/constants/constants';
import { router } from 'expo-router';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import CustomAvatar from './CustomAvatar';
import NameComponent from './NameComponent';

interface Props {
  userId: string;
}

const FollowUserCard = ({ userId }: Props) => {
  const { myId, setOtherUser } = useCentralStore(
    useShallow((state) => ({
      myId: state.user.userInfo.userId,
      setOtherUser: state.setOtherUser,
    }))
  );

  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (userId) {
        const res = await getUserInfo(userId);
        if (res) {
          const { name, avatar, isBlueTicked } = res.user;
          setUserInfo({ name, avatar, isBlueTicked });
        }
      }
    })();
  }, [userId]);

  const viewProfile = () => {
    if (userId === myId) {
      router.navigate('/Profile');
    } else {
      setOtherUser({ userId, goBackRoute: '/Home' });
      router.push('/OtherProfile');
    }
  };

  if (!userInfo) return null;

  return (
    <Pressable onPress={viewProfile}>
      <View style={styles.container}>
        <CustomAvatar
          avatar={userInfo.avatar}
          avatarStyle={styles.avatar}
        />
        <View style={styles.nameWrapper}>
          <NameComponent
            name={userInfo.name}
            isBlueTicked={userInfo.isBlueTicked}
            fontStyle={styles.name}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default FollowUserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  nameWrapper: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontFamily: Font.pRegular,
    color: Color.white,
  },
});
