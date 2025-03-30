import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Color, DeviceHeight } from '@/constants/constants';
import CustomBrightIcon from './CustomBrightIcon';
import { Pressable } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const FullScreenAvatarHeaderComponent = () => {
  return (
    <View style={styles.container}>
        <Pressable onPress={() => router.back()}>
          <CustomBrightIcon name='arrow-back-outline' />
        </Pressable>
    </View>
  );
};

export default FullScreenAvatarHeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    height: DeviceHeight * 0.1,
    justifyContent: 'flex-start',
    paddingTop: (DeviceHeight * 0.1) / 2,
    paddingHorizontal: 20,
  },
});
