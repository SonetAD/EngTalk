import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Color, Font, ImageBlurHash } from '@/constants/constants';
import { Backend } from '@/config';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';


interface Props {
  avatar: { default: boolean; src: string };
  username: string;
  fileName: string;
}

const VoiceBites = ({ avatar, username, fileName }: Props) => {
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const avatarImageSrc = avatar.default
    ? `${Backend.baseURL}/default/avatars/${avatar.src}`
    : `${Backend.baseURL}/uploads/avatars/${avatar.src}`;

  const audioSource = `${Backend.public}/posts/${fileName}`;


  useEffect(() => {
    
  }, []);

  const onPlay = () => {
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          source={avatarImageSrc}
          placeholder={ImageBlurHash}
          contentFit='cover'
          transition={1000}
          style={styles.avatar}
        />
      </View>

      <Text style={styles.username}>{username}</Text>

      <TouchableOpacity
        onPress={onPlay}
        style={styles.playButton}
      >
        <Ionicons
          name={isPlaying ? 'pause-circle' : 'play-circle'}
          size={36}
          color={Color.secondary.default}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VoiceBites;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 22, 34, 0.9)',
    padding: 14,
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: Color.black.default,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarWrapper: {
    width: 54,
    height: 54,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.black.twoHundred,
    padding: 3,
    borderWidth: 2,
    borderColor: Color.secondary.default,
    shadowColor: Color.secondary.default,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  username: {
    flex: 1,
    fontSize: 16,
    fontFamily: Font.pSemiBold,
    color: Color.white,
    marginLeft: 10,
  },
  playButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 156, 1, 0.1)',
    shadowColor: Color.secondary.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
