import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Easing } from 'react-native-reanimated';
import { Color } from '@/constants/constants';

interface Props {
  onRecordingEnd: () => void;
  onStartRecording: () => void;
}

const CircularProgress = ({ onRecordingEnd, onStartRecording }: Props) => {
  const progressBarRef = useRef<AnimatedCircularProgress | null>(null);
  const currentTimeRef = useRef(0);
  const startRecordingRef = useRef(false);
  const handleRecording =  () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!startRecordingRef.current) {
      startRecordingRef.current = true;
      progressBarRef.current?.animate(100, 30000, Easing.quad);
       onStartRecording();
    } else {
       onRecordingEnd();
    }
  };
  return (
    <AnimatedCircularProgress
      size={120}
      width={2}
      fill={0}
      tintColor={Color.secondary.default}
      rotation={360}
      backgroundColor='#3d5875'
      onAnimationComplete={() => {
        if (currentTimeRef.current > 0) {
          onRecordingEnd();
        }
      }}
      ref={(ref) => (progressBarRef.current = ref)}
    >
      {(fill) => {
        currentTimeRef.current = fill;
        return (
          <Pressable onPress={handleRecording}>
            <Ionicons
              name={
                startRecordingRef.current ? 'mic-outline' : 'mic-off-outline'
              }
              size={30}
              color={Color.secondary.default}
            />
          </Pressable>
        );
      }}
    </AnimatedCircularProgress>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({});
