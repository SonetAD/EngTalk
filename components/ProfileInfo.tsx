import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Color, DeviceWidth, Font } from '@/constants/constants';
import ProfilePageStat from '@/components/ProfilePageStat';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { useCallback, useEffect, useRef } from 'react';
import { NotificationSocket } from '@/libs/Socket';
import getUserInfo from '@/libs/api/userInfo';
import CustomAvatar from './CustomAvatar';
import capitalizeFirstLetter from './capitalizeFirstLetter';
import CustomButton from './CustomButton';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import RecordVoiceBites from './RecordVoiceBites';
import { router } from 'expo-router';

const ProfileInfo = () => {
  const {
    name,
    userId,
    gender,
    location,
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
      userId: state.user.userInfo.userId,
      gender: state.user.userInfo.gender,
      location: state.user.userInfo.location,
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

  useEffect(() => {
    if (userId) {
      NotificationSocket.on('follow', async (otherUserId) => {
        const updatedUserInfo = await getUserInfo(userId);
        useCentralStore.setState((prev) => ({
          user: {
            ...prev.user,
            userInfo: {
              ...prev.user.userInfo,
              following: updatedUserInfo.user.following,
              followers: updatedUserInfo.user.followers,
            },
          },
        }));
      });
    }
  }, [userId]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const recordPopUp = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);

  const editProfile = () => {
    router.push('/EditProfile');
  };

  const openFollowScreen = (screenName) => {
    router.push({
      pathname: '/FollowScreen',
      params: {
        screenName,
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
        <Pressable onPress={() => openFollowScreen('followers')}>
          <Text style={styles.statNumber}>{followers?.length || 0}</Text>
          <Text style={styles.statText}>followers</Text>
        </Pressable>
        <Pressable onPress={() => openFollowScreen('following')}>
          <Text style={styles.statNumber}>{following?.length || 0}</Text>
          <Text style={styles.statText}>following</Text>
        </Pressable>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.gender}>{capitalizeFirstLetter(gender)}</Text>
      <Text style={location ? styles.location : { display: 'none' }}>
        {location}
      </Text>
      <View style={styles.btnGroup}>
        <CustomButton
          containerStyle={styles.btn}
          text='Add Bite'
          handlePress={recordPopUp}
        />
        <CustomButton
          containerStyle={[styles.btn, styles.noBgBtn]}
          textStyle={{ color: Color.secondary.default }}
          text='Edit Profile'
          feedBackOff={true}
          handlePress={editProfile}
        />
      </View>

      <ProfilePageStat
        goldCoin={totalGoldCoin}
        trophy={totalTrophy}
        level={level}
        talkTime={talkTime}
      />
      <Text style={styles.voiceBites}>Voice Bites</Text>
      <RecordVoiceBites ref={bottomSheetModalRef} />
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
  gender: {
    color: '#FFC0CB',
    fontFamily: Font.pSemiBold,
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
