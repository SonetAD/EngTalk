import { StyleSheet, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Color, DeviceWidth, Font } from '@/constants/constants';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Haptics from 'expo-haptics';
import { Sound } from 'expo-av/build/Audio';

interface Props {
  audioSrc: string;
  onCancel: () => void;
  onPost: () => void;
}

const VoiceBitePreview = ({ audioSrc, onCancel, onPost }: Props) => {
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync({ uri: audioSrc });
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          sound.stopAsync();
        }
      });
      setSound(sound);
    })();

    return () => {
      sound?.unloadAsync();
    };
  }, []);

  const onPlay = async () => {
    if (!isPlaying) {
      await sound?.playAsync();
      setIsPlaying(true);
    } else {
      await sound?.stopAsync();
      setIsPlaying(false);
      sound?.setPositionAsync(0);
    }
  };

  const handleCancel = async() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isPlaying) {
      await sound?.stopAsync();
      setIsPlaying(false);
    }
    onCancel();
  };

  const handlePost = async() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isPlaying) {
      await sound?.stopAsync();
      setIsPlaying(false);
    }
    onPost();
  };
  return (
    <BottomSheetView style={styles.container}>
      <Text style={styles.title}>Your Voice, Your Story</Text>

      <Pressable onPress={onPlay}>
        <Ionicons
          name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
          size={40}
          color={Color.secondary.default}
        />
      </Pressable>
      <BottomSheetView style={styles.btnGroup}>
        <Pressable onPress={handleCancel}>
          <Text style={styles.cancelBtn}>Cancel</Text>
        </Pressable>
        <Pressable onPress={handlePost}>
          <Text style={styles.postBtn}>Post</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetView>
  );
};

export default VoiceBitePreview;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Color.white,
    fontFamily: Font.pSemiBold,
    fontSize: 13,
    textAlign: 'center',
    width: DeviceWidth * 0.6,
    marginBlock: 5,
  },
  btnGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  postBtn: {
    color: Color.white,
    fontFamily: Font.pSemiBold,
  },
  cancelBtn: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
  },
});
