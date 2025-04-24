import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import getUserInfo from '@/libs/api/userInfo';
import { Color, Font } from '@/constants/constants';
import { router } from 'expo-router';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import CustomAvatar from './CustomAvatar';

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
          const { name, _id, avatar } = res.user;
          setUserInfo({ name, avatar });
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
    <Pressable
      style={styles.card}
      onPress={viewProfile}
    >
      <CustomAvatar
        avatar={userInfo.avatar}
        avatarStyle={styles.avatar}
      />
      <Text style={styles.name}>{userInfo.name}</Text>
    </Pressable>
  );
};

export default FollowUserCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
    marginRight: 14,
  },
  name: {
    fontSize: 16,
    fontFamily: Font.pMedium,
    color: Color.white,
  },
});
