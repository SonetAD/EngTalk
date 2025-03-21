import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Backend } from '@/config';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import getAvatarUrl from '@/libs/getAvatarUrl';

interface User {
  avatar: { default: boolean; src: string };
  userName: string;
}

interface Props {
  userList: User[];
  viewProfile: (otherUserName: string) => void;
}

const TopThreeUser = ({ userList, viewProfile }: Props) => {
  if (userList.length < 3) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.topThree}>The Crowned Trio</Text>
      <Pressable onPress={() => viewProfile(userList[0].userName)}>
        <Image
          source={getAvatarUrl(userList[0].avatar)}
          style={[styles.avatar, styles.firstPlace]}
          contentFit='cover'
        />
      </Pressable>

      <View style={styles.bottomRow}>
        <Pressable onPress={() => viewProfile(userList[1].userName)}>
          <Image
            source={getAvatarUrl(userList[1].avatar)}
            style={[styles.avatar, styles.secondPlace]}
            contentFit='cover'
          />
        </Pressable>
        <Pressable onPress={() => viewProfile(userList[2].userName)}>
          <Image
            source={getAvatarUrl(userList[2].avatar)}
            style={[styles.avatar, styles.thirdPlace]}
            contentFit='cover'
          />
        </Pressable>
      </View>
      <Text style={styles.topTen}>The Best of the Best 10</Text>
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
    color: 'gold',
    fontFamily: Font.pBold,
    fontSize: 20,
    marginVertical: 20,
  },
  topTen: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    fontSize: 14,
    marginTop: 10,
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
