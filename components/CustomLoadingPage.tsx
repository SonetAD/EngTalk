import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import CustomStatusBar from './CustomStatusBar';
import Color from '@/constants/color';

const CustomLoadingPage = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size='large'
        color={Color.secondary.default}
      />
      <CustomStatusBar />
    </View>
  );
};

export default CustomLoadingPage;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
