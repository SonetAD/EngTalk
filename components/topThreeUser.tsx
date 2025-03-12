import React from 'react';
import { Image } from 'expo-image';
import { View,Text,StyleSheet } from 'react-native';

interface User {
  avatar: string;
  username: string;
  name: string;
  totalTrophy: number;
}

interface Props {
  userList: User[];
}

const TopThreeUser = ({ userList }: Props) => {
  if (userList.length < 3) return null; // Ensure we have 3 users

  return (
    <View style={styles.container}>
      {/* 2nd Place - Left */}
      <View style={[styles.userContainer, styles.secondPlace]}>
        <Image
          source={userList[1].avatar}
          style={styles.avatar}
          contentFit='cover'
        />
        <Text style={styles.name}>{userList[1].name}</Text>
        <Text style={styles.username}>@{userList[1].username}</Text>
        <Text style={[styles.trophy, styles.silver]}>
          🥈 {userList[1].totalTrophy}
        </Text>
      </View>

      {/* 1st Place - Center (Biggest) */}
      <View style={[styles.userContainer, styles.firstPlace]}>
        <Image
          source={userList[0].avatar}
          style={[styles.avatar, styles.firstAvatar]}
          contentFit='cover'
        />
        <Text style={styles.name}>{userList[0].name}</Text>
        <Text style={styles.username}>@{userList[0].username}</Text>
        <Text style={[styles.trophy, styles.gold]}>
          🥇 {userList[0].totalTrophy}
        </Text>
      </View>

      {/* 3rd Place - Right */}
      <View style={[styles.userContainer, styles.thirdPlace]}>
        <Image
          source={userList[2].avatar}
          style={styles.avatar}
          contentFit='cover'
        />
        <Text style={styles.name}>{userList[2].name}</Text>
        <Text style={styles.username}>@{userList[2].username}</Text>
        <Text style={[styles.trophy, styles.bronze]}>
          🥉 {userList[2].totalTrophy}
        </Text>
      </View>
    </View>
  );
};

export default TopThreeUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  userContainer: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  firstPlace: {
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 12,
    elevation: 10,
  },
  secondPlace: {
    backgroundColor: '#C0C0C0',
    marginRight: 20,
    elevation: 5,
  },
  thirdPlace: {
    backgroundColor: '#CD7F32',
    marginLeft: 20,
    elevation: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  firstAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontSize: 12,
    color: '#ddd',
  },
  trophy: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  gold: { color: '#FFD700' },
  silver: { color: '#C0C0C0' },
  bronze: { color: '#CD7F32' },
});
