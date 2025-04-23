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
  const { setOtherUser } = useCentralStore(
    useShallow((state) => ({
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
    setOtherUser({ userId, goBackRoute: '/Profile' });
    router.push('/OtherProfile');
  };

  if (!userInfo) return null
    return (
      <Pressable onPress={viewProfile}>
        <View style={styles.container}>
          <CustomAvatar
            avatar={userInfo.avatar}
            avatarStyle={styles.avatar}
          />
          <Text style={styles.name}>{userInfo.name}</Text>
        </View>
      </Pressable>
    );
};

export default FollowUserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontFamily: Font.pRegular,
    color: Color.white,
  },
});
