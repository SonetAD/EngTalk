import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { FadeInUp, BounceIn, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Font from '@/constants/font';
import Color from '@/constants/color';
import { AnimatedRollingNumber } from 'react-native-animated-rolling-numbers';

interface Props {
  goldCoin: number;
  level: number;
  talkTime: number;
  trophy: number;
}

const ProfilePageStat = ({ goldCoin, level, talkTime, trophy }: Props) => {
  return (
    <Animated.View
      entering={FadeInUp.duration(700)}
      style={styles.statsContainer}
    >
      {/* Row 1 */}
      <Animated.View
        entering={BounceIn.delay(300)}
        style={styles.statBox}
      >
        <Ionicons
          name='medal-outline'
          size={30}
          color='gold'
        />
        <AnimatedRollingNumber
          value={goldCoin || 0}
          textStyle={styles.statText}
          useGrouping
          enableCompactNotation
          compactToFixed={2}
          spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
        />
      </Animated.View>

      <Animated.View
        entering={BounceIn.delay(500)}
        style={styles.statBox}
      >
        <Ionicons
          name='trophy-outline'
          size={30}
          color='orange'
        />
        <AnimatedRollingNumber
          value={trophy || 0}
          textStyle={styles.statText}
          useGrouping
          enableCompactNotation
          compactToFixed={2}
          spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
        />
      </Animated.View>

      {/* Row 2 */}
      <Animated.View
        entering={BounceIn.delay(700)}
        style={styles.statBox}
      >
        <Ionicons
          name='stats-chart-outline'
          size={30}
          color='lightgreen'
        />
        <AnimatedRollingNumber
          value={level || 1}
          textStyle={styles.statText}
          useGrouping
          enableCompactNotation
          compactToFixed={2}
          spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
        />
      </Animated.View>

      <Animated.View
        entering={BounceIn.delay(900)}
        style={styles.statBox}
      >
        <Ionicons
          name='time-outline'
          size={30}
          color='lightblue'
        />
        <AnimatedRollingNumber
          value={talkTime/3600 || 0}
          textStyle={styles.statText}
          useGrouping
          enableCompactNotation
          compactToFixed={2}
          spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ProfilePageStat;

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
    backgroundColor: Color.black.twoHundred,
    padding: 15,
    borderRadius: 10,
  },
  statBox: {
    alignItems: 'center',
    width: '45%',
    padding: 10,
    marginBottom: 20,
  },
  statText: {
    fontSize: 20,
    fontFamily: Font.pSemiBold,
    color: Color.white,
    marginTop: 5,
  },
});
