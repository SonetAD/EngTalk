import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Font from '@/constants/font';

interface Props {
  message: string;
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
}

const ErrorAlert = ({ message, visibility, setVisibility }: Props) => {
  useEffect(() => {
    if (!visibility) return;

    const timer = setTimeout(() => {
      setVisibility(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [visibility]);

  if (!visibility) return null;

  return (
    <View style={[styles.card, { top: StatusBar.currentHeight || 20 }]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#f44336',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    zIndex: 1000,
    elevation: 5,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  message: {
    color: 'white',
    fontFamily: Font.pMedium,
    fontSize: 13,
  },
});

export default ErrorAlert;
