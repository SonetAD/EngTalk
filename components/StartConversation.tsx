import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import { RTCView, MediaStream } from 'react-native-webrtc';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import CustomButton from '@/components/CustomButton';
import LiveTimer from './liveTimer';
import CustomAvatar from './CustomAvatar';
import { router } from 'expo-router';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';

interface Props {
  userId: string;
  name: string;
  avatar: { src: string; stockAvatar: string };
  level: number;
  onEnd: () => void;
  remoteStream: MediaStream;
  toggleMute: () => void;
  toggleSpeaker: (val: boolean) => void;
  matchedUserData: any;
  timerRef: React.MutableRefObject<number>;
}

const StartConversation = ({
  userId,
  name,
  avatar,
  level,
  onEnd,
  remoteStream,
  toggleMute,
  toggleSpeaker,
  matchedUserData,
  timerRef,
}: Props) => {
  const { setOtherUser } = useCentralStore(
    useShallow((state) => ({
      setOtherUser: state.setOtherUser,
    }))
  );
  const [isMuted, setIsMuted] = useState(false);
  const [isLoudSpeakerOn, setIsLoudSpeakerOn] = useState(false);

  // const viewProfile = (o: string) => {
  //   setOtherUser(userId);
  //   router.push('/OtherProfile');
  // };

  return (
    <View style={styles.container}>
      <LiveTimer timerRef={timerRef} />
      <Pressable onPress={() => {}}>
        <CustomAvatar
          avatar={avatar}
          avatarStyle={styles.avatar}
        />
      </Pressable>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.level}>{`Level ${level}`}</Text>

      <View style={styles.iconGroup}>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            toggleMute();
            setIsMuted(!isMuted);
          }}
        >
          {isMuted ? (
            <Ionicons
              name='mic-off-outline'
              size={30}
              color={Color.gray.oneHundred}
              style={styles.icon}
            />
          ) : (
            <Ionicons
              name='mic-outline'
              size={30}
              color={Color.gray.oneHundred}
              style={styles.icon}
            />
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            toggleSpeaker(!isLoudSpeakerOn);
            setIsLoudSpeakerOn(!isLoudSpeakerOn);
          }}
        >
          {isLoudSpeakerOn ? (
            <Ionicons
              name='volume-high-outline'
              size={30}
              color={Color.gray.oneHundred}
              style={styles.icon}
            />
          ) : (
            <Ionicons
              name='volume-low-outline'
              size={30}
              color={Color.gray.oneHundred}
              style={styles.icon}
            />
          )}
        </Pressable>
      </View>
      <CustomButton
        text='End'
        handlePress={onEnd}
        containerStyle={styles.btn}
        textStyle={styles.btnText}
      />
      <RTCView streamURL={remoteStream.toURL()} />
    </View>
  );
};

export default StartConversation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 10,
  },
  name: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pBold,
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  level: {
    textAlign: 'center',
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    fontSize: 16,
    textAlignVertical: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: DeviceHeight * 0.1,
    backgroundColor: Color.red,
    width: 100,
  },
  btnText: {
    color: 'white',
  },
  iconGroup: {
    position: 'absolute',
    bottom: DeviceHeight * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: DeviceWidth * 0.5,
  },
  icon: {
    backgroundColor: Color.black.twoHundred,
    padding: 10,
    borderRadius: 50,
  },
});
