import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AnimatedRollingNumber } from 'react-native-animated-rolling-numbers';
import { Color, Font } from '@/constants/constants';
import { Easing } from 'react-native-reanimated';
import { DeviceWidth } from '@/constants/dimensions';

interface Props {
  rank: number;
}
const MyRank = ({ rank }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Rank</Text>
      <AnimatedRollingNumber
        containerStyle={styles.rankContainer}
        value={rank || 0}
        useGrouping
        textStyle={styles.digits}
        spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
      />
    </View>
  );
};

export default MyRank;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    fontSize: 16,
  },
  rankContainer: {
    marginVertical: 10,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.black.twoHundred,
    elevation: 5,
    borderRadius: 8,
    width: DeviceWidth * 0.8,
  },
  digits: {
    fontSize: 30,
    color: Color.gray.oneHundred,
    fontFamily: Font.pSemiBold,
  },
});
