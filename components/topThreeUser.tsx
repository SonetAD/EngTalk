import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import CustomAvatar from './CustomAvatar';

interface User {
  _id: string;
  avatar: {
    src: string;
    stockAvatar: string;
  };
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
      <Pressable onPress={() => viewProfile(userList[0]._id)}>
        <CustomAvatar
          avatar={userList[0].avatar}
          avatarStyle={styles.firstPlace}
        />
      </Pressable>

      <View style={styles.bottomRow}>
        <Pressable onPress={() => viewProfile(userList[1]._id)}>
          <CustomAvatar
            avatar={userList[1].avatar}
            avatarStyle={styles.secondPlace}
          />
        </Pressable>
        <Pressable onPress={() => viewProfile(userList[2]._id)}>
          <CustomAvatar
            avatar={userList[2].avatar}
            avatarStyle={styles.thirdPlace}
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
  firstPlace: {
    borderWidth: 4,
    width: DeviceWidth * 0.21,
    height: DeviceWidth * 0.21,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  secondPlace: {
    borderWidth: 4,
    width: DeviceWidth * 0.18,
    height: DeviceWidth * 0.18,
    borderColor: '#C0C0C0',
    shadowColor: '#C0C0C0',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  thirdPlace: {
    borderWidth: 4,
    width: DeviceWidth * 0.18,
    height: DeviceWidth * 0.18,
    borderColor: '#CD7F32',
    shadowColor: '#CD7F32',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
});
