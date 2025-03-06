import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '@/constants/color';
import Font from '@/constants/font';

interface Props {
    timerRef: React.MutableRefObject<number>;
}
const LiveTimer = ({timerRef}:Props) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
          timerRef.current = prev
        return prev+1
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (secs: number) => {
    if (secs < 60) return 'now';
    if (secs < 3600) {
      const mins = Math.floor(secs / 60);
      const secsLeft = secs % 60;
      return `${mins}:${String(secsLeft).padStart(2, '0')}`;
    }

    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const secsLeft = secs % 60;

    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secsLeft).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name='time-outline'
        size={23}
        color={Color.gray.oneHundred}
      />
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
    </View>
  );
};

export default LiveTimer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    color: Color.gray.oneHundred,
    fontFamily: Font.pRegular,
    marginLeft: 3,
  },
});
