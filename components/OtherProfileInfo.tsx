import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Backend } from '@/config';
import { Color, DeviceWidth, Font, ImageBlurHash } from '@/constants/constants';
import HomePageStat from './HomePageStat';
import CustomButton from './CustomButton';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import followUser from '@/libs/api/followUser';
import getUserInfo from '@/libs/api/userInfo';
import { NotificationSocket } from '@/libs/Socket';
import { useEffect, useState } from 'react';

const OtherProfileInfo = () => {
  const {
    name,
    userName,
    otherUserName,
    token,
    avatar,
    followers,
    following,
    totalTrophy,
    talkTime,
    level,
    totalUserBites,
  } = useCentralStore(
    useShallow((state) => ({
      name: state.otherUser.name,
      userName: state.user.userInfo.userName,
      otherUserName: state.otherUser.userName,
      avatar: state.otherUser.avatar,
      followers: state.otherUser.followers,
      following: state.otherUser.following,
      totalTrophy: state.otherUser.totalTrophy,
      talkTime: state.otherUser.talkTime,
      level: state.otherUser.level,
      totalUserBites: state.otherUser.otherUserBites.totalPosts,
      token: state.user.token,
    }))
  );

  const [followingInProgress, setFollowingInProgress] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);

  useEffect(() => {
    if (userName) {
      if (followers.includes(userName)) {
        setFollowStatus(true);
      } else {
        setFollowStatus(false);
      }
    }
  }, [followers, userName]);

  const avatarImageSrc = avatar?.default
    ? `${Backend.baseURL}/default/avatars/${avatar?.src}`
    : `${Backend.baseURL}/default/avatars/${avatar?.src}`;

  const followOtherUser = async () => {
    try {
      setFollowingInProgress(true);
      await followUser({
        token,
        userName: otherUserName,
      })
      const otherUserInfo = await getUserInfo(otherUserName)

      if (otherUserInfo) {
        useCentralStore.setState((prev) => ({
          otherUser: {
            ...prev.otherUser,
            followers: otherUserInfo.user.followers,
            following: otherUserInfo.user.following,
          },
        }));
        NotificationSocket.emit('follow', otherUserName);
        setFollowingInProgress(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      <View style={styles.btnGroup}>
        <CustomButton
          containerStyle={[styles.btn, followStatus && styles.noBgBtn]}
          textStyle={followStatus ? { color: Color.secondary.default } : {}}
          text={followStatus ? 'Following' : 'Follow'}
          feedBackOff={true}
          handlePress={followOtherUser}
          isLoading={followingInProgress}
        />
        <CustomButton
          containerStyle={[styles.btn, styles.noBgBtn]}
          textStyle={{ color: Color.secondary.default }}
          text='Message'
          feedBackOff={true}
          handlePress={() => {}}
        />
      </View>
      <HomePageStat
        trophy={totalTrophy}
        level={level}
        talkTime={talkTime}
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
  btnGroup: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10,
    gap: 5,
  },
  btn: {
    width: '45%',
    borderWidth: 1,
    borderColor: Color.secondary.default,
  },
  noBgBtn: {
    backgroundColor: Color.black.twoHundred,
  },
});
