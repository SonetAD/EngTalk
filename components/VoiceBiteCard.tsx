import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { Color, Font } from '@/constants/constants';
import CustomAvatar from './CustomAvatar';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import { Ionicons } from '@expo/vector-icons';
import deleteVoiceBite from '@/libs/api/deleteVoiceBite';
import CustomModal from './CustomModal';
import { NotificationSocket } from '@/libs/Socket';

interface Props {
  ownerId: string;
  voiceBiteId: string;
  avatar: { stockAvatar: string; src: string };
  name: string;
  file: string;
}

const gradients = [
  [Color.primary, Color.secondary.default],
  [Color.primary, Color.secondary.oneHundred],
  [Color.primary, Color.secondary.twoHundred],
];

const VoiceBitesCard = ({
  avatar,
  ownerId,
  voiceBiteId,
  name,
  file,
}: Props) => {
  const { userId, token, getVoiceBite } = useCentralStore(
    useShallow((state) => ({
      userId: state.user.userInfo.userId,
      token: state.user.token,
      getVoiceBite: state.getVoiceBite,
    }))
  );

  const isOwner = userId === ownerId;
  const soundRef = useRef<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
          { uri: file },
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

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setDeleteAlert(false);
      await deleteVoiceBite({ token, voiceBiteId });
      NotificationSocket.emit('deletePost');
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Pressable
      onPress={togglePlay}
      style={styles.container}
      disabled={isBuffering || isDeleting}
    >
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
      >
        {isOwner && !isPlaying && (
          <Pressable
            onPress={() => setDeleteAlert(true)}
            disabled={isDeleting || isBuffering || isPlaying}
            style={styles.deleteIconWrapper}
          >
            <BlurView
              intensity={40}
              tint='dark'
              style={StyleSheet.absoluteFill}
            >
              {!isDeleting ? (
                <Ionicons
                  name='trash-outline'
                  size={16}
                  color={Color.white}
                />
              ) : (
                <ActivityIndicator
                  size='small'
                  color={Color.red}
                />
              )}
            </BlurView>
          </Pressable>
        )}

        {isPlaying ? (
          <LinearGradient
            colors={randomGradient}
            style={styles.gradient}
          >
            <View style={styles.avatarWrapper}>
              {isBuffering ? (
                <ActivityIndicator
                  size='large'
                  color={Color.secondary.default}
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
      <View>
        <CustomModal
          isVisible={deleteAlert}
          setVisibility={setDeleteAlert}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this voice bite?
            </Text>
            <Pressable
              onPress={handleDelete}
              style={styles.deleteBtn}
            >
              <Text style={styles.deleteBtnText}>Delete</Text>
            </Pressable>
          </View>
        </CustomModal>
      </View>
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
    position: 'relative',
  },
  deleteIconWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 10,
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
  deleteBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: Color.red,
    borderRadius: 10,
  },
  deleteBtnText: {
    color: Color.white,
    fontFamily: Font.pRegular,
  },
  modalText: {
    fontFamily: Font.pRegular,
    textAlign: 'center',
  },
});
