import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AnimatedRollingNumber } from 'react-native-animated-rolling-numbers';
import Color from '@/constants/color';
import Font from '@/constants/font';
import { Easing } from 'react-native-reanimated';
import { DeviceWidth } from '@/constants/dimensions';
import Socket from '@/libs/Socket';

const OnlineNow = () => {
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    Socket.on('activeUserCount', (activeUser) => {
      setOnlineCount(activeUser);
    });
    Socket.emit('newUser');
  }, []);

  return (
    <View style={styles.onlineContainer}>
      <Text style={styles.onlineNowText}>Online Now</Text>
      <AnimatedRollingNumber
        containerStyle={styles.onlineCountContainer}
        value={onlineCount}
        useGrouping
        textStyle={styles.digits}
        spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
      />
    </View>
  );
};

export default OnlineNow;

const styles = StyleSheet.create({
  onlineContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  onlineNowText: {
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    fontSize: 16,
  },
  onlineCountContainer: {
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
