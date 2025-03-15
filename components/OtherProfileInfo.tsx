import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Backend } from '@/config';
import { Color, DeviceWidth, Font, ImageBlurHash } from '@/constants/constants';
import { useEffect, useState } from 'react';
import getUserInfo from '@/libs/api/userInfo';
import HomePageStat from './HomePageStat';

interface Props {
  posts: number;
  userName: string;
}

const OtherProfileInfo = ({ posts, userName }: Props) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    avatar: { default: false, src: '' },
    followers: [],
    following: [],
    totalTrophy: 0,
    talkTime: 0,
    level: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserInfo(userName);
        setUserInfo(res);
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, [userName]);

  console.log(userInfo);

  const avatarImageSrc = userInfo.avatar?.default
    ? `${Backend.baseURL}/default/avatars/${userInfo.avatar?.src}`
    : `${Backend.baseURL}/default/avatars/${userInfo.avatar?.src}`;

  return (
    <View>
      <View style={styles.info}>
        <Image
          source={avatarImageSrc}
          placeholder={ImageBlurHash}
          contentFit='cover'
          transition={1000}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.statNumber}>{posts || 0}</Text>
          <Text style={styles.statText}>bites</Text>
        </View>
        <View>
          <Text style={styles.statNumber}>
            {userInfo.followers?.length || 0}
          </Text>
          <Text style={styles.statText}>followers</Text>
        </View>
        <View>
          <Text style={styles.statNumber}>
            {userInfo.following?.length || 0}
          </Text>
          <Text style={styles.statText}>following</Text>
        </View>
      </View>
      <Text style={styles.name}>{userInfo.name}</Text>
      <Text style={styles.location}>Bangladesh</Text>
      <HomePageStat
        trophy={userInfo.totalTrophy}
        level={userInfo.level}
        talkTime={userInfo.talkTime}
      />
      <Text style={styles.voiceBites}>Voice Bites</Text>
    </View>
  );
};

export default OtherProfileInfo;

const styles = StyleSheet.create({
  info: {
    width: DeviceWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  statNumber: {
    color: Color.white,
    textAlign: 'center',
    fontFamily: Font.pSemiBold,
    fontSize: 20,
  },
  statText: {
    color: Color.white,
    textAlign: 'center',
    fontFamily: Font.pRegular,
    fontSize: 13,
  },
  name: {
    color: Color.white,
    fontFamily: Font.pBold,
    fontSize: 20,
    marginHorizontal: 10,
  },
  location: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    marginHorizontal: 10,
    fontSize: 12,
  },
  voiceBites: {
    color: Color.white,
    fontFamily: Font.pBold,
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 12,
  },
});
