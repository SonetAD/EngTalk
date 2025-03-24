import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { FadeInUp, BounceIn, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Font from '@/constants/font';
import Color from '@/constants/color';

const GenderFilterComponent = () => {
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
          name='male-female-outline'
          size={30}
          color={Color.secondary.twoHundred}
        />
        <Text style={styles.genderTxt}>All</Text>
      </Animated.View>

      <Animated.View
        entering={BounceIn.delay(500)}
        style={styles.statBox}
      >
        <Ionicons
          name='male'
          size={30}
          color={Color.gray.oneHundred}
        />
        <Text style={styles.genderTxt}>Male</Text>
      </Animated.View>

      <Animated.View
        entering={BounceIn.delay(700)}
        style={styles.statBox}
      >
        <Ionicons
          name='female'
          size={30}
          color={Color.gray.oneHundred}
        />
        <Text style={styles.genderTxt}>Female</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default GenderFilterComponent;

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
  genderTxt: {
    fontSize: 12,
    fontFamily: Font.pSemiBold,
    color: Color.white,
    marginTop: 5,
  },
});
