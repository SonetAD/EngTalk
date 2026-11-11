import { Text, StyleSheet } from 'react-native';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import CircularProgress from './CircularProgress';

import VoiceBitePreview from './VoiceBitePreview';
import { Color, Font } from '@/constants/constants';
import { Audio } from 'expo-av';
import uploadBite from '@/libs/api/uploadBite';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';

const RecordVoiceBites = forwardRef<BottomSheetModal>((props, ref) => {
  const { token, userId, getVoiceBite } = useCentralStore(
    useShallow((state) => ({
      token: state.user.token,
      userId: state.user.userInfo.userId,
      getVoiceBite: state.getVoiceBite,
    }))
  );

  const snapPoints = ['30%'];
  const [audioFile, setAudioFile] = useState<string | null | undefined>(null);
  const [postingStatus, setPostingStatus] = useState('');
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const recordingRef = useRef<Audio.Recording | null>(null);

  const recordingPermission = useRef(false);
  const canAskPermissionAgain = useRef(true);

  useEffect(() => {
    return () => {
      recordingRef.current = null;
    };
  });

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== 'granted') {
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
    } catch (err) {
      if (__DEV__) console.log(err);
    }
  };

  const stopRecording = async () => {
    try {
      await recordingRef.current?.stopAndUnloadAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recordingRef.current?.getURI();
      recordingRef.current = null;
      setAudioFile(uri);
    } catch (err) {
      if (__DEV__) console.log(err);
    }
  };

  const restartRecording = () => {
    setAudioFile(null);
  };

  const postVoiceBite = async () => {
    try {
      setPostingStatus('Posting...');
      await uploadBite({ userId, token, file: audioFile });
      setPostingStatus('');
      getVoiceBite();
      if (ref && typeof ref !== 'function') ref.current?.dismiss();
    } catch (err) {
      if (__DEV__) console.log(err);
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      stackBehavior='replace'
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      index={1}
      backdropComponent={BottomSheetBackdrop}
      handleStyle={styles.handleStyle}
      onDismiss={restartRecording}
    >
      <BottomSheetView style={styles.container}>
        {!recordingPermission.current && !canAskPermissionAgain.current ? (
          <Text style={styles.denied}>
            Mic access denied. Enable in settings.
          </Text>
        ) : !audioFile ? (
          <CircularProgress
            onRecordingEnd={stopRecording}
            onStartRecording={startRecording}
          />
        ) : !postingStatus ? (
          <VoiceBitePreview
            audioSrc={audioFile}
            onCancel={restartRecording}
            onPost={postVoiceBite}
          />
        ) : (
          <Text style={styles.postingStatus}>{postingStatus}</Text>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default RecordVoiceBites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(22, 22, 34, 0.9)',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleStyle: {
    display: 'none',
  },
  denied: {
    color: Color.red,
    fontFamily: Font.pBold,
    fontSize: 12,
    textAlign: 'center',
  },
  postingStatus: {
    color: Color.white,
    fontFamily: Font.pBold,
    textAlign: 'center',
  },
});
