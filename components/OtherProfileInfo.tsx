import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Color, DeviceWidth, Font } from '@/constants/constants';
import HomePageStat from './HomePageStat';
import CustomButton from './CustomButton';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import followUser from '@/libs/api/followUser';
import getUserInfo from '@/libs/api/userInfo';
import { NotificationSocket } from '@/libs/Socket';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import CustomAvatar from './CustomAvatar';
import capitalizeFirstLetter from './capitalizeFirstLetter';
import { Ionicons } from '@expo/vector-icons';
import NameComponent from './NameComponent';

const OtherProfileInfo = () => {
  const {
    name,
    userId,
    otherUserId,
    gender,
    location,
    token,
    avatar,
    followers,
    following,
    isBlueTicked,
    totalTrophy,
    talkTime,
    level,
    totalUserBites,
    getConversation,
  } = useCentralStore(
    useShallow((state) => ({
      name: state.otherUser.name,
      userId: state.user.userInfo.userId,
      otherUserId: state.otherUser.userId,
      gender: state.otherUser.gender,
      location: state.otherUser.location,
      avatar: state.otherUser.avatar,
      followers: state.otherUser.followers,
      following: state.otherUser.following,
      isBlueTicked: state.otherUser.isBlueTicked,
      totalTrophy: state.otherUser.totalTrophy,
      talkTime: state.otherUser.talkTime,
      level: state.otherUser.level,
      totalUserBites: state.otherUser.otherUserBites.totalPosts,
      token: state.user.token,
      getConversation: state.getConversation,
    }))
  );

  const [followingInProgress, setFollowingInProgress] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);

  useEffect(() => {
    if (userId) {
      if (followers.includes(userId)) {
        setFollowStatus(true);
      } else {
        setFollowStatus(false);
      }
    }
  }, [followers, userId]);

  const followOtherUser = async () => {
    try {
      setFollowingInProgress(true);
      await followUser({
        token,
        userId: otherUserId,
      });
      const otherUserInfo = await getUserInfo(otherUserId);

      if (otherUserInfo) {
        useCentralStore.setState((prev) => ({
          otherUser: {
            ...prev.otherUser,
            followers: otherUserInfo.user.followers,
            following: otherUserInfo.user.following,
          },
        }));
        NotificationSocket.emit('follow', otherUserId);
        setFollowingInProgress(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openChatScreen = () => {
    useCentralStore.setState((prev) => ({
      conversationStatus: {
        ...prev.conversationStatus,
        isLoading: true,
        isError: false,
        error: '',
      },
    }));
    getConversation(otherUserId);
    router.push('/Chat');
  };

  const openFollowers = () => {
    router.push({
      pathname: '/followers',
      params: {
        userId: otherUserId,
      },
    });
  };

  const openFollowing = () => {
    router.push({
      pathname: '/following',
      params: {
        userId: otherUserId,
      },
    });
  };

  return (
    <View>
      <View style={styles.info}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/FullScreenAvatar',
              params: {
                src: avatar.src,
                stockAvatar: avatar.stockAvatar,
              },
            })
          }
        >
          <CustomAvatar avatar={avatar} />
        </Pressable>

        <View>
          <Text style={styles.statNumber}>{totalUserBites || 0}</Text>
          <Text style={styles.statText}>bites</Text>
        </View>
        <Pressable onPress={openFollowers}>
          <Text style={styles.statNumber}>{followers?.length || 0}</Text>
          <Text style={styles.statText}>followers</Text>
        </Pressable>
        <Pressable onPress={openFollowing}>
          <Text style={styles.statNumber}>{following?.length || 0}</Text>
          <Text style={styles.statText}>following</Text>
        </Pressable>
      </View>
      <NameComponent
        name={name}
        isBlueTicked={isBlueTicked}
      />

      <Text style={styles.gender}>{capitalizeFirstLetter(gender)}</Text>
      <Text style={location ? styles.location : { display: 'none' }}>
        {location}
      </Text>
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
          handlePress={openChatScreen}
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
  location: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    fontSize: 12,
  },
  gender: {
    color: '#FFC0CB',
    fontFamily: Font.pSemiBold,
    fontSize: 12,
  },

  voiceBites: {
    color: Color.white,
    fontFamily: Font.pBold,
    marginVertical: 10,
    fontSize: 12,
  },
  btnGroup: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: '1%',
  },
  btn: {
    width: '49%',
    borderWidth: 1,
    borderColor: Color.secondary.default,
  },
  noBgBtn: {
    backgroundColor: Color.black.twoHundred,
  },
});
