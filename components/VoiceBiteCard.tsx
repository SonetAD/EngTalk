import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { Color, Font } from '@/constants/constants';
import { Backend } from '@/config';
import CustomAvatar from './CustomAvatar';

interface Props {
  avatar: { default: boolean; src: string };
  username: string;
  name: string;
  fileName: string;
}

const gradients = [
  [Color.primary, Color.secondary.default],
  [Color.primary, Color.secondary.oneHundred],
  [Color.primary, Color.secondary.twoHundred],
];

const VoiceBitesCard = ({ avatar, username, name, fileName }: Props) => {
  const soundRef = useRef<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const audioSource = `${Backend.public}/posts/${fileName}`;

  useEffect(() => {
    return () => {
      unloadSound();
    };
  }, []);

  const togglePlay = async () => {
    try {
      if (!isPlaying) {
        setIsBuffering(true);
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioSource },
          { shouldPlay: true }
        );
        soundRef.current = sound;

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setIsBuffering(false);
            if (status.didJustFinish) {
              animatePlay(false);
              unloadSound();
              setIsPlaying(false);
            }
          }
        });

        animatePlay(true);
      } else {
        await soundRef.current?.stopAsync();
        unloadSound();
        animatePlay(false);
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.log(err);
      setIsBuffering(false);
    }
  };

  const unloadSound = async () => {
    await soundRef.current?.unloadAsync();
    soundRef.current = null;
  };

  const animatePlay = (playing: boolean) => {
    Animated.timing(scaleAnim, {
      toValue: playing ? 1.05 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const randomGradient: any =
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <Pressable
      onPress={togglePlay}
      style={styles.container}
    >
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
      >
        {isPlaying ? (
          <LinearGradient
            colors={randomGradient}
            style={styles.gradient}
          >
            <View style={styles.avatarWrapper}>
              {isBuffering ? (
                <ActivityIndicator
                  size='large'
                  color={Color.white}
                />
              ) : (
                <CustomAvatar
                  avatar={avatar}
                  avatarStyle={styles.avatar}
                />
              )}
            </View>
            <Text style={styles.username}>
              {name.length > 15 ? name.substring(0, 15) + '...' : name}
            </Text>
          </LinearGradient>
        ) : (
          <BlurView
            intensity={50}
            style={[styles.cardBackground, styles.blurBackground]}
          >
            <View style={styles.avatarWrapper}>
              {isBuffering ? (
                <ActivityIndicator
                  size='large'
                  color={Color.white}
                />
              ) : (
                <CustomAvatar
                  avatar={avatar}
                  avatarStyle={styles.avatar}
                />
              )}
            </View>
            <Text style={styles.username}>
              {name.length > 15 ? name.substring(0, 15) + '...' : name}
            </Text>
          </BlurView>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default VoiceBitesCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 180,
    height: 300,
    borderRadius: 16,
    shadowColor: Color.black.default,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurBackground: {
    backgroundColor: 'rgba(22, 22, 34, 0.3)',
  },
  gradient: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: Color.black.twoHundred,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  username: {
    fontSize: 18,
    fontFamily: Font.pSemiBold,
    color: Color.white,
    marginTop: 12,
    textAlign: 'center',
  },
});
