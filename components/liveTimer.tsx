import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '@/constants/color';
import Font from '@/constants/font';
import useCentralStore from '@/store/store/Store';
import { useShallow } from 'zustand/react/shallow';
import spendGoldCoin from '@/libs/api/spendGoldCoin';

interface Props {
  timerRef: React.MutableRefObject<number>;
  onGoldCoinError?: (message: string) => void;
}
const LiveTimer = ({ timerRef, onGoldCoinError }: Props) => {
  const { filteredGender, token } = useCentralStore(
    useShallow((state) => ({
      filteredGender: state.call.filteredGender,
      token: state.user.token,
    }))
  );
  const [seconds, setSeconds] = useState(0);
  const spendGoldCoinRef = useRef(false);

  useEffect(() => {
    const timer = setInterval( () => {
      setSeconds((prev) => {
        timerRef.current = prev;
        return prev + 1;
      });
      if (filteredGender === 'male' || filteredGender === 'female') {
        if (timerRef.current >= 60 && !spendGoldCoinRef.current) {
          spendGoldCoinRef.current = true;
          spendGoldCoin({ token }).catch((err: Error) => {
            onGoldCoinError?.(err.message);
          });
        }
      }
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
