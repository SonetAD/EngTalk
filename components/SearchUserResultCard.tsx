import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomAvatar from './CustomAvatar';
import { Font, Color } from '@/constants/constants';
import { router } from 'expo-router';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import NameComponent from './NameComponent';

interface Props {
  otherUserId: string;
  name: string;
  isBlueTicked: boolean;
  avatar: {
    src: string;
    stockAvatar: string;
  };
}

const SearchUserResultCard = ({
  otherUserId,
  name,
  isBlueTicked,
  avatar,
}: Props) => {
  const { userId, setOtherUser } = useCentralStore(
    useShallow((state) => ({
      userId: state.user.userInfo.userId,
      setOtherUser: state.setOtherUser,
    }))
  );

  const viewProfile = (otherUserId: string) => {
    if (userId === otherUserId) {
      router.navigate('/Profile');
    } else {
      setOtherUser({ userId: otherUserId, goBackRoute: '/SearchUser' });
      router.push('/OtherProfile');
    }
  };

  return (
    <Pressable onPress={() => viewProfile(otherUserId)}>
      <View style={styles.container}>
        <CustomAvatar
          avatar={avatar}
          avatarStyle={styles.avatar}
        />
        <View style={styles.nameWrapper}>
          <NameComponent
            name={name}
            isBlueTicked={isBlueTicked}
            fontStyle={styles.name}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default SearchUserResultCard;

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
