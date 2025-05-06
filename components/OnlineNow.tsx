import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AnimatedRollingNumber } from 'react-native-animated-rolling-numbers';
import Color from '@/constants/color';
import Font from '@/constants/font';
import { Easing } from 'react-native-reanimated';
import { DeviceWidth } from '@/constants/dimensions';
import { NotificationSocket } from '@/libs/Socket';
import useCentralStore from '@/store/store/Store';

const OnlineNow = () => {
  const userId = useCentralStore((state) => state.user.userInfo.userId);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    if (userId) {
      NotificationSocket.on('activeUserCount', (activeUser) => {
        setOnlineCount(activeUser);
      });
      NotificationSocket.emit('newUser', userId);
    }
  }, [userId]);

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
    marginTop: 10,
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
    width: DeviceWidth * 0.9,
  },
  digits: {
    fontSize: 30,
    color: Color.gray.oneHundred,
    fontFamily: Font.pSemiBold,
  },
});
