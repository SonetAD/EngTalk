import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Backend } from '@/config';
import { Color, DeviceWidth, Font, ImageBlurHash } from '@/constants/constants';
import ProfilePageStat from '@/components/ProfilePageStat';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';

const ProfileInfo = () => {
  const {
    name,
    avatar,
    followers,
    following,
    totalUserBites,
    totalGoldCoin,
    totalTrophy,
    talkTime,
    level,
  } = useCentralStore(
    useShallow((state) => ({
      name: state.user.userInfo.name,
      avatar: state.user.userInfo.avatar,
      followers: state.user.userInfo.followers,
      following: state.user.userInfo.following,
      totalGoldCoin: state.userStat.totalGoldCoin,
      totalTrophy: state.userStat.totalTrophy,
      talkTime: state.userStat.talkTime,
      level: state.userStat.level,
      totalUserBites: state.userBites.totalPosts,
    }))
  );

  const avatarImageSrc = avatar?.default
    ? `${Backend.baseURL}/default/avatars/${avatar?.src}`
    : `${Backend.baseURL}/default/avatars/${avatar?.src}`;

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
          <Text style={styles.statNumber}>{totalUserBites || 0}</Text>
          <Text style={styles.statText}>bites</Text>
        </View>
        <View>
          <Text style={styles.statNumber}>{followers?.length || 0}</Text>
          <Text style={styles.statText}>followers</Text>
        </View>
        <View>
          <Text style={styles.statNumber}>{following?.length || 0}</Text>
          <Text style={styles.statText}>following</Text>
        </View>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.location}>Bangladesh</Text>
      <ProfilePageStat
        goldCoin={totalGoldCoin}
        trophy={totalTrophy}
        level={level}
        talkTime={talkTime}
      />
      <Text style={styles.voiceBites}>Voice Bites</Text>
    </View>
  );
};

export default ProfileInfo;

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
