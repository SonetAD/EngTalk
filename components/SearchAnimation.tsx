import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  withRepeat,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Color, Font, DeviceHeight, DeviceWidth } from '@/constants/constants';

const RippleSearch = () => {
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    const animateRipple = () => {
      rippleScale.value = withTiming(DeviceWidth * 1.5, {
        duration: 1200,
        easing: Easing.ease,
      });
      rippleOpacity.value = withTiming(0, { duration: 1200 });

      setTimeout(() => {
        rippleScale.value = 0;
        rippleOpacity.value = 1;
        animateRipple();
      }, 1500);
    };

    animateRipple();

    translateY.value = withRepeat(
      withTiming(10, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const rippleStyle = useAnimatedStyle(() => ({
    width: rippleScale.value,
    height: rippleScale.value,
    borderRadius: rippleScale.value / 2,
    opacity: rippleOpacity.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconContainer}>
          <Animated.View style={iconStyle}>
            <Ionicons
              name='search-circle-outline'
              size={50}
              color={Color.secondary.oneHundred}
            />
          </Animated.View>
          <Animated.View style={[styles.ripple, rippleStyle]} />
        </View>
        <Text style={styles.headline}>Finding a Partner...</Text>
      </View>
    </View>
  );
};

export default RippleSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    position: 'relative',
  },
  ripple: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 144, 1, 0.3)', // Transparent orange from your palette
  },
  headline: {
    color: Color.white,
    fontFamily: Font.pSemiBold,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
