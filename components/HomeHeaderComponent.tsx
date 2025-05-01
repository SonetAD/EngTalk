import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Color, DeviceHeight, Font } from '@/constants/constants';
import CustomBrightIcon from './CustomBrightIcon';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  hasUnreadMessage: boolean;
  hasSilverCoin: boolean;
}

const HomeHeaderComponent = ({ hasUnreadMessage, hasSilverCoin }: Props) => {
  const openInbox = () => {
    router.navigate('/Inbox');
  };

  const scaleMessage = useSharedValue(0);
  const scaleSilver = useSharedValue(0);

  useEffect(() => {
    scaleMessage.value = hasUnreadMessage
      ? withSpring(1, { damping: 5, stiffness: 100 })
      : 0;
  }, [hasUnreadMessage]);

  useEffect(() => {
    scaleSilver.value = hasSilverCoin
      ? withSpring(1, { damping: 5, stiffness: 100 })
      : 0;
  }, [hasSilverCoin]);

  const animatedDotMessageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleMessage.value }],
    opacity: scaleMessage.value,
  }));

  const animatedDotSilverStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSilver.value }],
    opacity: scaleSilver.value,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.eng}>
        eng<Text style={[styles.eng, styles.talk]}>talk</Text>
      </Text>

      <View style={styles.iconGroup}>
        {/* Search Icon */}
        <Pressable onPress={() => router.navigate('/SearchUser')}>
          <CustomBrightIcon name='search-outline' />
        </Pressable>

        {/* Inbox Icon */}
        <Pressable
          onPress={openInbox}
          style={styles.iconWrapper}
        >
          <CustomBrightIcon name='chatbubble-ellipses-outline' />
          {hasUnreadMessage && (
            <Animated.View style={[styles.redDot, animatedDotMessageStyle]} />
          )}
        </Pressable>

        {/* Silver Coin Icon */}
        <Pressable
          onPress={() => router.navigate('/ConvertSilverCoinScreen')}
          style={styles.iconWrapper}
        >
          <Ionicons
            name='diamond-outline'
            size={24}
            color={Color.silver}
          />
          {hasSilverCoin && (
            <Animated.View style={[styles.redDot, animatedDotSilverStyle]} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: (DeviceHeight * 0.1) / 2,
    paddingHorizontal: 20,
  },
  eng: {
    color: Color.white,
    fontSize: 20,
    fontFamily: Font.pSemiBold,
  },
  talk: {
    color: Color.secondary.twoHundred,
  },
  iconWrapper: {
    position: 'relative',
  },
  redDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    backgroundColor: Color.red,
    borderRadius: 5,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 10,
  },
});
