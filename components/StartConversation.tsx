import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Color, DeviceHeight, DeviceWidth, Font } from '@/constants/constants';
import { RTCView, MediaStream } from 'react-native-webrtc';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import CustomButton from '@/components/CustomButton';
import LiveTimer from './liveTimer';
import CustomAvatar from './CustomAvatar';
import { router, useNavigation } from 'expo-router';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import NameComponent from './NameComponent';
import CustomModal from '@/components/CustomModal';

interface Props {
  activateNavigationRef: any;
  userId: string;
  name: string;
  isBlueTicked: boolean;
  avatar: { src: string; stockAvatar: string };
  location: string;
  level: number;
  onEnd: () => void;
  remoteStream: MediaStream;
  toggleMute: () => void;
  toggleSpeaker: (val: boolean) => void;
  timerRef: React.MutableRefObject<number>;
}

const StartConversation = ({
  activateNavigationRef,
  userId,
  name,
  isBlueTicked,
  avatar,
  location,
  level,
  onEnd,
  remoteStream,
  toggleMute,
  toggleSpeaker,
  timerRef,
}: Props) => {
  const { setOtherUser } = useCentralStore(
    useShallow((state) => ({
      setOtherUser: state.setOtherUser,
    }))
  );
  const navigation = useNavigation();
  const [isMuted, setIsMuted] = useState(false);
  const [isLoudSpeakerOn, setIsLoudSpeakerOn] = useState(false);
  const [showCallWillEndAlert, setShowCallWillEndAlert] = useState(false);

  useEffect(() => {
    const unSubscribe = navigation.addListener('beforeRemove', (e) => {
      activateNavigationRef.current = e;
      e.preventDefault();
      setShowCallWillEndAlert(true);
    });

    return unSubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <LiveTimer timerRef={timerRef} />
      <CustomAvatar
        avatar={avatar}
        avatarStyle={styles.avatar}
      />

      <NameComponent
        name={name}
        isBlueTicked={isBlueTicked}
        fontStyle={styles.name}
      />

      <Text style={styles.subText}>{location}</Text>
      <Text style={styles.subText}>{`Level ${level}`}</Text>

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
      <RTCView
        streamURL={remoteStream.toURL()}
        style={styles.remoteStream}
      />
      <CustomModal
        isVisible={showCallWillEndAlert}
        setVisibility={setShowCallWillEndAlert}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>End Call?</Text>
          <Text style={styles.modalText}>
            You're about to leave the call. Are you sure?
          </Text>
          <Pressable
            onPress={onEnd}
            style={styles.modalBtn}
          >
            <Text style={styles.modalBtnText}>End Call</Text>
          </Pressable>
        </View>
      </CustomModal>
    </View>
  );
};

export default StartConversation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.black.twoHundred,
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
  subText: {
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
  remoteStream: {
    width: 0,
    height: 0,
  },
  modalContent: {
    backgroundColor: Color.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: Color.red,
    fontFamily: Font.pSemiBold,
  },
  modalBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: Color.red,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.red,
  },
  modalBtnText: {
    color: Color.white,
    fontFamily: Font.pRegular,
  },
  modalText: {
    fontFamily: Font.pRegular,
    textAlign: 'center',
    marginBottom: 10,
  },
});
