import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import { Backend } from '@/config';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';

interface User {
  avatar: { default: boolean; src: string };
}

interface Props {
  userList: User[];
}

const TopThreeUser = ({ userList }: Props) => {
  if (userList.length < 3) return null; // Ensure we have 3 users

  const getAvatarUri = (avatar: { default: boolean; src: string }) => {
    return `${Backend.baseURL}/default/avatars/${avatar.src}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topThree}>The Crowned Trio</Text>
      <Image
        source={getAvatarUri(userList[0].avatar)}
        style={[styles.avatar, styles.firstPlace]}
        contentFit='cover'
      />

      <View style={styles.bottomRow}>
        <Image
          source={getAvatarUri(userList[1].avatar)}
          style={[styles.avatar, styles.secondPlace]}
          contentFit='cover'
        />

        <Image
          source={getAvatarUri(userList[2].avatar)}
          style={[styles.avatar, styles.thirdPlace]}
          contentFit='cover'
        />
      </View>
      <Text style={styles.topThree}>The Crowned Trio</Text>
    </View>
  );
};

export default TopThreeUser;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topThree: {
    color: Color.white,
    fontFamily: Font.pBold,
    fontSize: 20,
    marginVertical: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: DeviceWidth,
    marginTop: DeviceHeight * 0.02,
  },
  avatar: {
    borderRadius: 50,
    borderWidth: 4,
  },
  firstPlace: {
    width: DeviceWidth * 0.21,
    height: DeviceWidth * 0.21,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  secondPlace: {
    width: DeviceWidth * 0.18,
    height: DeviceWidth * 0.18,
    borderColor: '#C0C0C0',
    shadowColor: '#C0C0C0',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  thirdPlace: {
    width: DeviceWidth * 0.18,
    height: DeviceWidth * 0.18,
    borderColor: '#CD7F32',
    shadowColor: '#CD7F32',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
});
