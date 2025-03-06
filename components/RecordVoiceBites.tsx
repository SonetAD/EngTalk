import { Text, StyleSheet } from 'react-native';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import CircularProgress from './CircularProgress';

import {
  useAudioRecorder,
  requestRecordingPermissionsAsync,
  getRecordingPermissionsAsync,
  RecordingPresets,
  PLAYBACK_STATUS_UPDATE,
} from 'expo-audio';
import VoiceBitePreview from './VoiceBitePreview';
import { Color, Font } from '@/constants/constants';
import * as FileSystem from 'expo-file-system';

const RecordVoiceBites = forwardRef<BottomSheetModal, {}>((props, ref) => {
  const snapPoints = ['30%'];
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const recordingPermission = useRef(false);
  const canAskPermissionAgain = useRef(true);

  useEffect(() => {
    (async () => {
      const { granted, canAskAgain } = await getRecordingPermissionsAsync();
      recordingPermission.current = granted;
      canAskPermissionAgain.current = canAskAgain;
    })();
  }, []);

  const saveTemporaryFile = async (cacheFileLocation: string | null) => {
    if (cacheFileLocation) {
      const extenssion = cacheFileLocation.split('.').pop();
      const filePath = `${FileSystem.documentDirectory}/engtalk_voice_bite_temp.${extenssion}`;

      try {
        const kaka = await FileSystem.copyAsync({
          from: `file://${cacheFileLocation}`,
          to: filePath,
        });
        return filePath;
      } catch (err: any) {
        console.log(err);
        return null;
      }
    }
    return null;
  };

  const startRecording = async () => {
    if (!recordingPermission.current) {
      await requestRecordingPermissionsAsync();
    }

    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    if (audioRecorder.isRecording) {
      await audioRecorder.stop();
    }
  };

  const onRecordingEnd = async () => {
    await stopRecording();
    const tempFile = await saveTemporaryFile(audioRecorder.uri);
    console.log(FileSystem.documentDirectory);
    setAudioFile(tempFile);
  };

  const restartRecording = () => {
    setAudioFile(null);
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
            onRecordingEnd={onRecordingEnd}
            onStartRecording={startRecording}
          />
        ) : (
          <VoiceBitePreview
            audioSrc={audioFile}
            onCancel={restartRecording}
            onPost={() => {}}
          />
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
});
