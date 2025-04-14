import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { FadeInUp, BounceIn, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Font from '@/constants/font';
import Color from '@/constants/color';
import { AnimatedRollingNumber } from 'react-native-animated-rolling-numbers';

interface Props {
  goldCoin?: number;
  trophy: number;
  talkTime: number;
  level?: number;
}

const HomePageStat = ({ goldCoin, trophy, talkTime, level }: Props) => {
  return (
    <Animated.View
      entering={FadeInUp.duration(700)}
      style={styles.statsContainer}
    >
      <Animated.View
        entering={BounceIn.delay(300)}
        style={styles.statBox}
      >
        <Ionicons
          name={level ? 'stats-chart-outline' : 'medal-outline'}
          size={30}
          color='gold'
        />
        <AnimatedRollingNumber
          value={level || goldCoin || 0}
          textStyle={styles.statText}
          useGrouping
          enableCompactNotation
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
          spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
        />
      </Animated.View>

      <Animated.View
        entering={BounceIn.delay(700)}
        style={styles.statBox}
      >
        <Ionicons
          name='time-outline'
          size={30}
          color='lightblue'
        />
        <AnimatedRollingNumber
          value={talkTime / 3600}
          textStyle={styles.statText}
          useGrouping
          enableCompactNotation
          fixedOnlyForCompact={false}
          compactToFixed={1}
          spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default HomePageStat;

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
    backgroundColor: Color.black.twoHundred,
    padding: 15,
    borderRadius: 10,
  },
  statBox: {
    alignItems: 'center',
    padding: 10,
  },
  statText: {
    fontSize: 20,
    fontFamily: Font.pSemiBold,
    color: Color.white,
    marginTop: 5,
  },
});
