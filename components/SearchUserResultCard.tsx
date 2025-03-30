import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomAvatar from './CustomAvatar';
import { Font, Color } from '@/constants/constants';

interface Props {
  userId: string;
  name: string;
  avatar: {
    src: string;
    stockAvatar: string;
  };
}
const SearchUserResultCard = ({ userId, name, avatar }: Props) => {
  return (
    <View style={styles.container}>
      <CustomAvatar
        avatar={avatar}
        avatarStyle={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default SearchUserResultCard;

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
