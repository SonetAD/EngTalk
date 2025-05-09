import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color, DeviceWidth, Font } from '@/constants/constants';
import CustomAvatar from './CustomAvatar';
import NameComponent from './NameComponent';

interface Props {
  rank: number;
  avatar: {
    src: string;
    stockAvatar: string;
  };
  gender: string;
  userId: string;
  name: string;
  isBlueTicked: boolean;
  totalTrophy: number;
  viewProfile: (otherUserId: string) => void;
}

const LeaderboardCard = ({
  userId,
  rank,
  avatar,
  gender,
  name,
  isBlueTicked,
  totalTrophy,
  viewProfile,
}: Props) => {
  return (
    <Pressable onPress={() => viewProfile(userId)}>
      <View style={styles.container}>
        <Text style={styles.rank}>{rank}</Text>
        <View style={styles.contentRow}>
          <View style={styles.leftRow}>
            <View style={styles.avatarWrapper}>
              <CustomAvatar avatar={avatar} avatarStyle={styles.avatar} />
            </View>
            <NameComponent
              name={name}
              isBlueTicked={isBlueTicked}
              fontStyle={styles.name}
              nameLength={10}
            />
          </View>
          <View style={styles.trophyContainer}>
            <Text style={styles.trophyCount}>{totalTrophy}</Text>
            <Ionicons name="trophy" size={20} color={Color.secondary.default} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default LeaderboardCard;

const styles = StyleSheet.create({
  container: {
    width: DeviceWidth * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 22, 34, 0.9)',
    padding: 14,
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: Color.black.default,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rank: {
    fontSize: 18,
    fontFamily: Font.pBold,
    color: Color.white,
    marginRight: 12,
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarWrapper: {
    width: 54,
    height: 54,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.black.twoHundred,
    padding: 3,
    borderWidth: 2,
    borderColor: Color.secondary.default,
    shadowColor: Color.secondary.default,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 16,
    fontFamily: Font.pSemiBold,
    color: Color.white,
  },
  trophyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  trophyCount: {
    fontSize: 16,
    fontFamily: Font.pBold,
    color: Color.secondary.default,
  },
});
