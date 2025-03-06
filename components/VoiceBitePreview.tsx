import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Color, DeviceWidth, Font } from '@/constants/constants';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Haptics from 'expo-haptics';
import { Sound } from 'expo-av/build/Audio';

interface Props {
  audioSrc: string;
  onCancel: () => {};
  onPost: () => {};
}

const VoiceBitePreview = ({ audioSrc, onCancel, onPost }: Props) => {
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync(require(audioSrc));
      setSound(sound);
    })();
    
    return ()=>{
      sound?.unloadAsync()
    }
  }, []);

  const onPlay = () => {
    sound?.playAsync()
  };

  const handleCancel = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCancel();
  };

  const handlePost = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  return (
    <BottomSheetView style={styles.container}>
      <Text style={styles.title}>Your Voice, Your Story</Text>

      <TouchableOpacity onPress={onPlay}>
        <Ionicons
          name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
          size={40}
          color={Color.secondary.default}
        />
      </TouchableOpacity>
      <BottomSheetView style={styles.btnGroup}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelBtn}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postBtn}>Post</Text>
        </TouchableOpacity>
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
