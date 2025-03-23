import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Color, DeviceHeight, Font } from '@/constants/constants';
import CustomBrightIcon from './CustomBrightIcon';
import { router } from 'expo-router';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const HomeHeaderComponent = () => {
  const { hasUnreadMessage } = useCentralStore(
    useShallow((state) => ({
      hasUnreadMessage: state.hasUnreadMessage,
    }))
  );

  const openInbox = () => {
    router.navigate('/Inbox');
  };

  const scale = useSharedValue(0);

  useEffect(() => {
    if (hasUnreadMessage) {
      scale.value = withSpring(1, { damping: 5, stiffness: 100 });
    } else {
      scale.value = 0;
    }
  }, [hasUnreadMessage]);

  const animatedDotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.eng}>
        eng<Text style={[styles.eng, styles.talk]}>talk</Text>
      </Text>

      <Pressable
        onPress={openInbox}
        style={styles.iconWrapper}
      >
        {/* Message Icon */}
        <CustomBrightIcon name='chatbubble-ellipses-outline' />

        {/* Animated Red Dot */}
        {hasUnreadMessage && (
          <Animated.View style={[styles.redDot, animatedDotStyle]} />
        )}
      </Pressable>
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
});
